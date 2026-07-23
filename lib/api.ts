export type Presente = {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  reservado: boolean;
};

export async function getPresentes(): Promise<Presente[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registry/gifts/`, {
    next: { revalidate: 60 }, // cache por 60s (ISR)
  });

  if (!res.ok) throw new Error("Erro ao buscar presentes");
  return res.json();
}

export async function reservarPresente(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registry/gifts/${id}/reserve/`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Erro ao reservar presente");
  return res.json();
}