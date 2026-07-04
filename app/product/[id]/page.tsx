interface Params {
  id: string;
}

interface PageProps {
  params: Promise<Params>;
}

async function Page({ params }: PageProps) {
  const { id } = await params;

  console.log(id);

  return <div>page jj {id}</div>;
}

export default Page;