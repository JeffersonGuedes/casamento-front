export type Presente = {
  id: number;
  name: string;
  description: string;
  link?: string | null;
  category: string;
  price: string | null;
  image: string | null;
  status: "AVAILABLE" | "RESERVED" | "PURCHASED" | string;
  buyer_name: string | null;
  updated_at: string;
  product_url?: string | null;
  pix_qr_code?: string | null;
  pix_payload?: string | null;
};

function getApiBaseUrl(): string {
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!rawBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está configurada nas variáveis de ambiente");
  }
  return rawBaseUrl.replace(/\/+$/, "");
}

function normalizeImageUrl(image: string | null | undefined): string | null {
  if (!image) {
    return null;
  }

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  const baseUrl = getApiBaseUrl();
  const normalizedPath = image.replace(/^\/+/, "");

  if (normalizedPath.startsWith("media/")) {
    return `${baseUrl}/${normalizedPath}`;
  }

  return `${baseUrl}/media/${normalizedPath}`;
}

function normalizePresente(presente: Presente): Presente {
  return {
    ...presente,
    image: normalizeImageUrl(presente.image),
  };
}

export async function getPresentes(): Promise<Presente[]> {
  const baseUrl = getApiBaseUrl();
  let allGifts: Presente[] = [];
  let nextPageUrl = `${baseUrl}/api/registry/gifts/`;

  while (nextPageUrl) {
    const res = await fetch(nextPageUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Erro ao buscar presentes");
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      allGifts = [...allGifts, ...data.map(normalizePresente)];
      break; 
    }
    
    if (data && typeof data === "object" && Array.isArray(data.results)) {
      allGifts = [...allGifts, ...data.results.map(normalizePresente)];
      nextPageUrl = data.next; 
    } else {
      break;
    }
  }

  return allGifts;
}

export async function getPresente(id: number): Promise<Presente> {
  const presentes = await getPresentes();
  const presente = presentes.find((item) => item.id === id);

  if (!presente) {
    throw new Error("Presente não encontrado");
  }

  return presente;
}

export async function reserveGift(id: number, buyerName = "Reserva iniciada no checkout") {
  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/api/registry/gifts/${id}/reserve/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      buyer_name: buyerName,
      buyer_email: "checkout@local",
      payment_proof_type: "PIX",
    }),
  });

  if (!res.ok) {
    let message = "Erro ao reservar presente";
    try {
      const errorData = await res.json();
      message = errorData.error || message;
    } catch {
      // mantém mensagem padrão
    }
    throw new Error(message);
  }

  return res.json();
}

export type ConfirmarPresenteInput = {
  buyerName: string;
  buyerEmail: string;
  message?: string;
  comprovante?: File | null;
};

// Reaproveita o endpoint de reserva que já existe, mandando os dados extras
// como multipart/form-data (necessário por causa do arquivo do comprovante).
// CONFIRMAR com o backend se esses nomes de campo (buyer_name, buyer_email,
// message, comprovante) são os que ele espera — só temos certeza de "buyer_name"
// pelo JSON de exemplo que você mandou.
export async function confirmarPresente(id: number, data: ConfirmarPresenteInput) {
  const formData = new FormData();
  formData.append("buyer_name", data.buyerName);
  formData.append("buyer_email", data.buyerEmail);
  formData.append("payment_proof_type", "PIX");
  if (data.message) formData.append("message", data.message);
  if (data.comprovante) formData.append("payment_proof_file", data.comprovante);

  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/api/registry/gifts/${id}/reserve/`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Erro ao confirmar presente");
  return res.json();
}