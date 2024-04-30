const BASE_URL = "http://localhost:5000/api";


/**  generate html */

function generateCupcakeHTML(cupcake) {
  return `
    <div data-cupcake-id=${cupcake.id}>
      <li>
        ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
        <button class="delete-button">X</button>
      </li>
      <img class="Cupcake-img"
            src="${cupcake.image}"
            alt="(no image provided)">
    </div>
  `;
}


/** put initial cupcakes on page. */

async function showInitialCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);

  for (let cupcakeData of response.data.cupcakes) {
    let newCupcake = $(generateCupcakeHTML(cupcakeData));
    $("#cupcakes-list").append(newCupcake);
  }
}


/**  adding of new cupcakes */

$("#new-cupcake-form").on("submit", async function (evt) {
  evt.preventDefault();

  let flavor = $("#form-flavor").val();
  let rating = $("#form-rating").val();
  let size = $("#form-size").val();
  let image = $("#form-image").val();

  const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    rating,
    size,
    image
  });

  let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
  $("#cupcakes-list").append(newCupcake);
  $("#new-cupcake-form").trigger("reset");
});


/**  delete cupcake */

$("#cupcakes-list").on("click", ".delete-button", async function (evt) {
  evt.preventDefault();
  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-cupcake-id");

  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
  $cupcake.remove();
});

function generateCupcakeHTML(cupcake) {
  return `
    <div data-cupcake-id=${cupcake.id}>
      <li>
        ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
        <button class="delete-button">X</button>
        <button class="update-button">Update</button>
      </li>
      <img class="Cupcake-img"
            src="${cupcake.image}"
            alt="(no image provided)">
    </div>
  `;
}

/** put initial cupcakes on page. */
async function showInitialCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);

  for (let cupcakeData of response.data.cupcakes) {
    let newCupcake = $(generateCupcakeHTML(cupcakeData));
    $("#cupcakes-list").append(newCupcake);
  }
}

/** adding of new cupcakes */
$("#new-cupcake-form").on("submit", async function (evt) {
  evt.preventDefault();

  let flavor = $("#form-flavor").val();
  let rating = $("#form-rating").val();
  let size = $("#form-size").val();
  let image = $("#form-image").val();

  const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    rating,
    size,
    image
  });

  let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
  $("#cupcakes-list").append(newCupcake);
  $("#new-cupcake-form").trigger("reset");
});

/** handle clicking delete: delete cupcake */
$("#cupcakes-list").on("click", ".delete-button", async function (evt) {
  evt.preventDefault();
  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-cupcake-id");

  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
  $cupcake.remove();
});

/** Function to generate HTML for updating a cupcake */
function generateUpdateForm(cupcake) {
  return `
    <form class="update-form">
      <div>
        <label for="update-flavor">Flavor: </label>
        <input name="flavor" id="update-flavor" value="${cupcake.flavor}">
      </div>

      <div>
        <label for="update-size">Size: </label>
        <input name="size" id="update-size" value="${cupcake.size}">
      </div>

      <div>
        <label for="update-rating">Rating: </label>
        <input type="number" name="rating" id="update-rating" value="${cupcake.rating}">
      </div>

      <div>
        <label for="update-image">Image: </label>
        <input name="image" id="update-image" value="${cupcake.image}">
      </div>

      <button class="update-button">Update</button>
    </form>
  `;
}

/** Handle clicking update: show update form */
$("#cupcakes-list").on("click", ".update-button", async function (evt) {
  evt.preventDefault();
  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-cupcake-id");

  const response = await axios.get(`${BASE_URL}/cupcakes/${cupcakeId}`);
  let cupcake = response.data.cupcake;

  let updateForm = $(generateUpdateForm(cupcake));
  $cupcake.html(updateForm);
});

/** Handle submitting update form */
/** Handle submitting update form */
$("#cupcakes-list").on("submit", ".update-form", async function (evt) {
  evt.preventDefault();
  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-cupcake-id");

  // Capture updated values from the form fields
  let flavor = $cupcake.find("#update-flavor").val();
  let rating = $cupcake.find("#update-rating").val();
  let size = $cupcake.find("#update-size").val();
  let image = $cupcake.find("#update-image").val();

  // Send PATCH request to update cupcake
  await axios.patch(`${BASE_URL}/cupcakes/${cupcakeId}`, {
    flavor,
    rating,
    size,
    image
  });

  // Refresh the cupcakes list
  showInitialCupcakes();
});
showInitialCupcakes();