// components/OverviewCards.tsx
export default function OverviewCards() {
  const cards = [
    { title: 'Contatos', value: 7265, change: '+11.01%' },
    { title: 'Negócios', value: 3671, change: '-0.03%' },
    { title: 'Ganhos', value: 156, change: '+15.03%' },
    { title: 'Faturamento', value: 9999, change: '+6.08%' }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-semibold text-gray-600">{card.title}</h3>
          <p className="text-xl font-bold">{card.value}</p>
          <p className="text-sm text-green-600">{card.change}</p>
        </div>
      ))}
    </div>
  );
}