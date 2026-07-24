export type Presente = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string | null;
  image_base64: string | null;
  status: "PENDENTE" | "RESERVADO" | "COMPRADO" | string;
  buyer_name: string | null;
  updated_at: string;
};

export async function getPresentes(): Promise<Presente[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registry/gifts/`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Erro ao buscar presentes");
  return res.json();
}

// ASSUMINDO que a API expõe o detalhe de um presente em /api/registry/gifts/{id}/
// (padrão comum de REST/Django). Confirme isso testando a URL direto no navegador;
// se não existir, precisamos criar esse endpoint no backend.
export async function getPresente(id: number): Promise<Presente> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registry/gifts/${id}/`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Presente não encontrado");
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
  if (data.message) formData.append("message", data.message);
  if (data.comprovante) formData.append("comprovante", data.comprovante);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registry/gifts/${id}/reserve/`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Erro ao confirmar presente");
  return res.json();
}