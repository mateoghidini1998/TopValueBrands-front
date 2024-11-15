type Props = {
  params: { id: string };
};

export default async function StoragePage({ params }: Props) {
  // Llama a la API usando `fetch` o una librería de HTTP
  const res = await fetch(`http://localhost:5000/api/v1/pallets/${params.id}`, {
    cache: "no-store", // 'no-store' para peticiones dinámicas (SSR)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return (
    <div>
      <h1>Storage Page</h1>
      <p>ID: {params.id}</p>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
}
