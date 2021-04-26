App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // Load animals.
    $.getJSON("../animals.json", function (data) {
      var animalsRow = $("#animalsRow");
      var animalTemplate = $("#animalTemplate");

      for (i = 0; i < data.length; i++) {
        animalTemplate.find(".panel-title").text(data[i].name);
        animalTemplate.find("img").attr("src", data[i].picture);
        animalTemplate.find(".animal-breed").text(data[i].breed);
        animalTemplate.find(".animal-age").text(data[i].age);
        animalTemplate.find(".animal-location").text(data[i].location);
        animalTemplate.find(".btn-adopt").attr("data-animalid", data[i].id);

        animalsRow.append(animalTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function () {
    // https://stackoverflow.com/a/23522755/6313728
    // Determine if browser is Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Show the announcement on Safari browsers
    if (isSafari) {
      // The bootstrap 3 way
      // https://getbootstrap.com/docs/3.3/css/#helper-classes-show-hide
      document.getElementById("safariAnnouncement").classList.remove("hidden");
      document.getElementById("safariAnnouncement").classList.add("show");
    }

    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON("Adoption.json", function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted animals
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    // https://stackoverflow.com/a/23522755/6313728
    // Determine if browser is Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Do not bind the events on Safari browsers
    if (!isSafari) {
      $(document).on("click", ".btn-adopt", App.handleAdopt);
    }
  },

  markAdopted: function (adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed()
      .then(function (instance) {
        adoptionInstance = instance;

        return adoptionInstance.getAdopters.call();
      })
      .then(function (adopters) {
        for (i = 0; i < adopters.length; i++) {
          if (adopters[i] !== "0x0000000000000000000000000000000000000000") {
            $(".panel-animal").eq(i).find("button").text("Success").attr("disabled", true);
          }
        }
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var animalId = parseInt($(event.target).data("animalid"));

    var adoptionInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed()
        .then(function (instance) {
          adoptionInstance = instance;

          // Execute adopt as a transaction by sending account
          return adoptionInstance.adopt(animalId, { from: account });
        })
        .then(function (result) {
          return App.markAdopted();
        })
        .catch(function (err) {
          console.log(err.message);
        });
    });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
