const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  confirmRsvp: async (data: { name: string; phone: string; is_attending: boolean }) => {
    const res = await fetch(`${API_URL}/rsvp/confirm/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao confirmar presença');
    return res.json();
  },

  getGifts: async () => {
    // cache: 'no-store' força o Next.js a sempre buscar dados frescos (crucial para o status de reserva)
    const res = await fetch(`${API_URL}/registry/gifts/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Erro ao buscar presentes');
    return res.json();
  },

  reserveGift: async (giftId: number, buyerName: string) => {
    const res = await fetch(`${API_URL}/registry/gifts/${giftId}/reserve/`, {
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