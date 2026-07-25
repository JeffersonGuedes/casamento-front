function getApiBaseUrl(): string {
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!rawBaseUrl) {
    throw new Error('NEXT_PUBLIC_API_URL não está configurada');
  }
  return rawBaseUrl.replace(/\/+$/, '');
}

export const api = {
  confirmRsvp: async (data: { name: string; phone: string; is_attending: boolean }) => {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/rsvp/confirm/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao confirmar presença');
    return res.json();
  },

  getGifts: async () => {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/registry/gifts/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Erro ao buscar presentes');
    const data = await res.json();
    return Array.isArray(data) ? data : data?.results || [];
  },

  reserveGift: async (giftId: number, buyerName: string) => {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/registry/gifts/${giftId}/reserve/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ buyer_name: buyerName }),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Erro ao reservar presente');
    }
    return res.json();
  }
};