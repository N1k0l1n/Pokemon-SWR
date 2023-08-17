import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Form, Spinner, Button } from "react-bootstrap";
import Image from "next/image";
import usePokemon from "@/hooks/usePokemon";
import { FormEvent } from "react";
import * as PokemonApi from "@/network/pokemon-api";

export default function PokemonDetailsPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || "";

  const { pokemon, pokemonLoading, mutatePokemon } = usePokemon(pokemonName);

  async function handleSubmitNickname(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const nickname = formData.get("nickaname")?.toString().trim();

    if(!pokemon || !nickname) return;

    const update = await PokemonApi.setNickName(pokemon, nickname);
    mutatePokemon(update, {revalidate: false});
  }

  return (
    <>
      <Head>{pokemon && <title>{`${pokemon.name} Pokemon App`}</title>}</Head>

      <div className="d-flex flex-column align-items-center">
        <p>
          <Link href="/" className="link-light">
            ← Home
          </Link>
        </p>
        {pokemonLoading && <Spinner animation="grow" />}
        {pokemon === null && <p>Pokemon not found</p>}
        {pokemon && (
          <>
            <h1 className="text-center text-capitalize">{pokemon.name}</h1>
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={"Pokemon" + pokemon.name}
              width={400}
              height={400}
            />
            <div className="d-inline-block mt-2">
              <div>
                <strong>Types:</strong>
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </div>
              <div>
                <strong>Height:</strong>
                {pokemon.height}
              </div>
              <div>
                <strong>Weight:</strong>
                {pokemon.weight}
              </div>
            </div>
            <Form
              onSubmit={handleSubmitNickname}
              className="d-inline-block mt-2"
            >
              <Form.Group controlId="pokemon" className="mb-3">
                <Form.Label>Give this Pokemon a NickName</Form.Label>
                <Form.Control name="nickname" placeholder="E.g. Ferdinand" />
              </Form.Group>
              <Button type="submit">Set NickName</Button>
            </Form>
          </>
        )}
      </div>
    </>
  );
}
