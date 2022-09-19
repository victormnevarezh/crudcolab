import {
    onGetGames,
    saveGame,
    deleteGame,
    getGame,
    updateGame,
    getGames,
  } from "./firebase.js";
  
  const gameForm = document.getElementById("game-form");
  const gamesContainer = document.getElementById("games-container");
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getgames();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  
    onGetGames((querySnapshot) => {
      gamesContainer.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const game = doc.data();
  
        gamesContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
      <h3 class="h5">${game.title}</h3>
      <p>${game.genre}</p>
      <p>${game.developer}</p>
      <p>${game.price}</p>
      <p>${game.releaseYear}</p>
      <div>
        <button class="btn btn-primary btn-delete" data-id="${doc.id}">
          🗑 Delete
        </button>
        <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
          🖉 Edit
        </button>
      </div>
    </div>`;
      });
  
      const btnsDelete = gamesContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await deleteGame(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEdit = gamesContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getGame(e.target.dataset.id);
            const game = doc.data();
            console.log(game);
            gameForm["game-title"].value = game.title;
            gameForm["game-genre"].value = game.genre;
            gameForm["game-price"].value = game.price;
            gameForm["game-releaseYear"].value = game.releaseYear;
            gameForm["game-developer"].value = game.developer;
  
            editStatus = true;
            id = doc.id;
            gameForm["btn-game-form"].innerText = "Update";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });
  
  gameForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const title = gameForm["game-title"];
    const genre = gameForm["game-genre"];
    const price = gameForm["game-price"];
    const developer = gameForm["game-developer"];
    const releaseYear = gameForm["game-releaseYear"];
  
    try {
      if (!editStatus) {
        await saveGame(title.value, genre.value, price.value, releaseYear.value, developer.value);
      } else {
        await updateGame(id, {
          title: title.value,
          genre: genre.value,
          price: price.value,
          releaseYear: releaseYear.value,
          developer: developer.value,
        });
  
        editStatus = false;
        id = "";
        gameForm["btn-game-form"].innerText = "Save";
      }
  
      gameForm.reset();
      title.focus();
    } catch (error) {
      console.log(error);
    }
  });