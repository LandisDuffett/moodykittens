/**working version
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
loadKittens()

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    affection: setAffection(),
    get mood() {
      if (this.affection >= 6) {
        return "happy";
      } else if (this.affection == 4 || this.affection == 5) {
        return "tolerant";
      } else if (this.affection == 3 || this.affection == 2 || this.affection == 1) {
        return "angry";
      } else {
        return "gone";
      }
      }
    }
  
    pushToArray(kittens, kitten) 
  
 
  saveKittens()
  form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()}

function pushToArray(arr, obj) {
  const index = arr.findIndex((k) => k.name ==obj.name)

  if (index === -1) {
    arr.push(obj);
  } else {
    alert("You can't have more than one kitty with the same name! Please choose a different name.");
    drawKittens()
    
  }
}
/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensData) {
    kittens = kittensData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittyNumElem = document.getElementById("kittyNum")
  let template = ""
  kittens.forEach(kitten => {
    if (kitten.mood == "happy") {
      template += `
    <div class="card p-2 text-center w-30">
        <img class="kitten happy" src="https://robohash.org/${kitten.name}?set=set4" height="120" alt="Moody Kittens">
        <div class="mt-2">
          <b class="text-center"><span>Name:  ${kitten.name}</span>
          </b><br>
          <b class="text-center"><span>Mood: ${kitten.mood} </span>
          </b><br>
          <b class="text-center"><span>Affection: ${kitten.affection} </span>
          </b><br>
          <button onclick="pet('${kitten.id}')">pet</button>
          <button onclick="catnip('${kitten.id}')">catnip</button>
        </div>
      </div>
    `
    } else if (kitten.mood == "tolerant") {
      template += `
    <div class="card p-2 text-center w-30">
        <img class="kitten tolerant" src="https://robohash.org/${kitten.name}?set=set4" height="120" alt="Moody Kittens">
        <div class="mt-2">
          <b class="text-center"><span>Name:  ${kitten.name}</span>
          </b><br>
          <b class="text-center"><span>Mood: ${kitten.mood} </span>
          </b><br>
          <b class="text-center"><span>Affection: ${kitten.affection} </span>
          </b><br>
          <button onclick="pet('${kitten.id}')">pet</button>
          <button onclick="catnip('${kitten.id}')">catnip</button>
        </div>
      </div>
    `
    } else if (kitten.mood == "angry") {
      template += `
    <div class="card p-2 text-center w-30">
        <img class="kitten angry" src="https://robohash.org/${kitten.name}?set=set4" height="120" alt="Moody Kittens">
        <div class="mt-2">
          <b class="text-center"><span>Name:  ${kitten.name}</span>
          </b><br>
          <b class="text-center"><span>Mood: ${kitten.mood} </span>
          </b><br>
          <b class="text-center"><span>Affection: ${kitten.affection} </span>
          </b><br>
          <button onclick="pet('${kitten.id}')">pet</button>
          <button onclick="catnip('${kitten.id}')">catnip</button>
        </div>
      </div>
    `
    } else {
      template += `
    <div class="card bye p-2 text-center w-30">
        <img class="kitten gone" src="https://robohash.org/${kitten.name}?set=set4" height="120" alt="Moody Kittens">
        <div class="mt-2">
          <b class="text-center"><span>Sorry,  ${kitten.name} ran away and is gone forever.</span>
          </b>
        </div>
      </div>
    `
    }
    
  })
  kittyNumElem.innerText = kittens.length.toString()
  document.getElementById("mainfield").innerHTML = template
}

drawKittens()

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

function empty() {
  kittens = [];
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let cat =findKittenById(id)
  let dec =Math.random()
  if (dec > .7) {cat.affection++}
  else {cat.affection--}
  setKittenMood(cat)
  saveKittens()
  drawKittens()
}


/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let cat =findKittenById(id)
  cat.affection =5
  setKittenMood(cat)
  saveKittens()
  drawKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (kitten.affection >= 6) {
    kitten.mood ="happy";
  } else if (kitten.affection == 4 || kitten.affection == 5) {
    kitten.mood ="tolerant";
  } else if (kitten.affection == 3 || kitten.affection == 2 || kitten.affection == 1) {
    kitten.mood ="angry";
  } else {
    kitten.mood ="gone";
  }
}




function setAffection() {
  return Math.floor(Math.random() * 6 + 1)
}


/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
