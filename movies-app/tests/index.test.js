import { act } from "react";
import ReactDOMClient from "react-dom/client";
import { describe, expect, test } from "@jest/globals";

import Card from "../src/components/Card";

describe("Testing card component", () => {
  const movie = {
    id: "11",
    name: "Nightmare before christmas",
    genre: 6,
    img: "https://www.dimanoinmano.it/img/638590/full/libri-per-ragazzi/infanzia/nightmare-before-christmas.jpg",
    price: 600,
    genreName: "horror",
    studioId: "1",
  };
  const responsiveStyle = {
    avatarSize: 280,
    cardStyle: "regularCard",
  };
  const studios = [
    {
      id: "1",
      name: "Disney studios",
      shortName: "Disney",
      logo: "https://cdn.mos.cms.futurecdn.net/qfFFFhnM8LwZnjpTECN3oB.jpg",
      money: 1000,
    },
    {
      id: "2",
      name: "Warner Bros.",
      shortName: "Warner",
      logo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12c6f684-d447-4457-84fa-12033cfd581e/d9z4nxu-626ae303-e830-4b4f-ab8b-4aff7f1bef0f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyYzZmNjg0LWQ0NDctNDQ1Ny04NGZhLTEyMDMzY2ZkNTgxZVwvZDl6NG54dS02MjZhZTMwMy1lODMwLTRiNGYtYWI4Yi00YWZmN2YxYmVmMGYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gtKaGVrDg8gzU7QFThusbHJw2d6bKgnDauezUcZo-1A",
      money: 900,
    },
    {
      id: "3",
      name: "Sony Pictures",
      shortName: "Sony",
      logo: "https://logoeps.com/wp-content/uploads/2013/05/sony-pictures-entertainment-vector-logo.png",
      money: 700,
    },
  ];
  const setMovieToTransfer = () => null;

  test("Testing img load with proper cors parameter", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    // ✅ Render the component inside act().
    await act(() => {
      ReactDOMClient.createRoot(container).render(
        <Card
          movie={movie}
          avatarSize={responsiveStyle.avatarSize}
          cardStyle={responsiveStyle.cardStyle}
          studios={studios}
          setMovieToTransfer={setMovieToTransfer}
        />
      );
    });
    const img = document.querySelector("img");

    expect(img.alt).toBe("Nightmare before christmas");
    expect(img).toHaveAttribute("referrerPolicy", "no-referrer");
  });

  test("Testing studio matches movie studio in card", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    // ✅ Render the component inside act().
    await act(() => {
      ReactDOMClient.createRoot(container).render(
        <Card
          movie={movie}
          avatarSize={responsiveStyle.avatarSize}
          cardStyle={responsiveStyle.cardStyle}
          studios={studios}
          setMovieToTransfer={setMovieToTransfer}
        />
      );
    });
    const paragraphs = document.querySelectorAll("p");
    expect(
      Array.from(paragraphs).some(
        (paragraph) => paragraph.textContent === "Disney studios"
      )
    ).toBe(true);
  });

  test("Testing movie genre is displayed", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    // ✅ Render the component inside act().
    await act(() => {
      ReactDOMClient.createRoot(container).render(
        <Card
          movie={movie}
          avatarSize={responsiveStyle.avatarSize}
          cardStyle={responsiveStyle.cardStyle}
          studios={studios}
          setMovieToTransfer={setMovieToTransfer}
        />
      );
    });
    const paragraphs = document.querySelectorAll("p");
    expect(
      Array.from(paragraphs).some(
        (paragraph) => paragraph.textContent === "horror"
      )
    ).toBe(true);
  });
});
