// StatusChannelConstants.ts

export type StatusChannelData = {
  timestamp: string;
  canal: string;
  ganho?: number;
  perdido?: number;
};

export type ChannelData = {
  canal: string;
  ganhos: number;
  perdidos: number;
};

export const Data: StatusChannelData[] = [
  { timestamp: "2025-06-04T12:00:00Z", canal: "Inbound", ganho:1 },
  { timestamp: "2025-06-03T12:00:00Z", canal: "Inbound", perdido: 1 },
  { timestamp: "2025-06-02T12:00:00Z", canal: "Inbound", ganho: 1 },
  { timestamp: "2025-06-01T12:00:00Z", canal: "Fidelização", perdido: 1 },
  { timestamp: "2025-05-30T12:00:00Z", canal: "Fidelização", ganho: 1 },
  { timestamp: "2025-05-28T12:00:00Z", canal: "Outbound", ganho: 1 },
  { timestamp: "2025-05-27T12:00:00Z", canal: "Outbound", perdido: 1 },
  { timestamp: "2025-05-25T12:00:00Z", canal: "Outbound", perdido: 2 },
  { timestamp: "2025-05-24T12:00:00Z", canal: "Campanha", ganho: 7 },
  { timestamp: "2025-05-23T12:00:00Z", canal: "Campanha", ganho: 3 },
  { timestamp: "2025-05-22T12:00:00Z", canal: "Campanha", perdido: 2 },
  { timestamp: "2025-05-20T12:00:00Z", canal: "Campanha", ganho: 1 },
  { timestamp: "2025-05-18T12:00:00Z", canal: "Tráfego Pago", perdido: 4 },
  { timestamp: "2025-05-17T12:00:00Z", canal: "Tráfego Pago", perdido: 2 },
  { timestamp: "2025-05-15T12:00:00Z", canal: "Tráfego Pago", ganho: 1 },
  { timestamp: "2025-05-10T12:00:00Z", canal: "Indicação", ganho: 6 },
  { timestamp: "2025-05-09T12:00:00Z", canal: "Indicação", perdido: 1 },
  { timestamp: "2025-05-05T12:00:00Z", canal: "Parcerias", ganho: 4 },
  { timestamp: "2025-05-04T12:00:00Z", canal: "Parcerias", perdido: 2 },
  { timestamp: "2025-04-30T12:00:00Z", canal: "Evento", ganho: 5 },
  { timestamp: "2025-04-28T12:00:00Z", canal: "Evento", perdido: 3 },
];
