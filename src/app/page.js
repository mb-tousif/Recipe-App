import ingredients from '../../ingredients.json'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">Recipe app</h1>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center">Ingredients</h2>
          <ul className="grid grid-cols-3 gap-4">
            {ingredients.map((ingredient) => (
              <li key={ingredient.id} className="flex flex-col items-center">
                <span className="text-xl font-bold">{ingredient.label}</span>
              </li>
            ))}
          </ul>
        </div>
    </main>
  );
}
