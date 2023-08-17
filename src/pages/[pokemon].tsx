import { useRouter } from "next/router";
import useSWR from "swr";
import * as PokemonApi from "@/network/pokemon-api";
import Head from "next/head";
import { title } from "process";
import Link from "next/link";
import { Spinner } from "react-bootstrap";
import Image from "next/image";

export default function PokemonDetailsPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || "";

  const { data: pokemon, isLoading: pokemonLoading } = useSWR(
    pokemonName,
    PokemonApi.getPokemon
  );

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
        {pokemon && (
          <>
            <h1 className="text-center text-capitalize">{pokemon.name}</h1>
            <Image 
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={"Pokemon" + pokemon.name}
                width={400}
                height={400}
            />
          </>
        )}
      </div>
    </>
  );
}
