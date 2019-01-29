const PubSub = require('../helpers/pub_sub.js');

const NumbersGameView = function(container,selection, target, round){
  this.container = container;
  this.elements = [];
  this.selection = selection;
  this.target = target;
  this.round = round;
}

NumbersGameView.prototype.showNumbers = function () {

    this.container.innerHTML = '';
    const mainContainer = document.createElement('div');
    const numbersContainer = document.createElement('div');
    mainContainer.classList.id = "letters"
    //Number tiles to the parent container
    console.log(this.selection);
    this.selection.forEach( (number, index) => {
      const numberTile = document.createElement('div');
      numberTile.classList.add('letters');
      numberTile.id = `number${index+1}`;

      const numberFormat = document.createElement('h2');
      numberFormat.textContent = number;
      numberTile.appendChild(numberFormat);
      numbersContainer.appendChild(numberTile);
    });

    //Add the target to the parent container
    const targetTile = document.createElement('div');
    targetTile.classList.add('target-tile');
    targetTile.textContent = this.target;

    mainContainer.appendChild(numbersContainer);
    mainContainer.appendChild(targetTile);


    const numberSubmitContainer = document.createElement('div');
    numberSubmitContainer.id = "number-submit";
    for (let i = 0; i<2;i++) {
      const form = document.createElement('form');
      form.id = `p${i+1}-number-submit`;
      const label = document.createElement('label');
      label.for = "number";
      label.textContent = "Submit your solution";

      const input1 = document.createElement('input');
      input1.type = "text";
      input1.id = "number";
      input1.required=true;

      const input2 = document.createElement('input');
      input2.type = "submit";
      input2.value = "save";

      form.appendChild(label);
      form.appendChild(input1);
      form.appendChild(input2);
      numberSubmitContainer.appendChild(form);

      this.elements.push(form);

      this.container.appendChild(mainContainer);
      this.container.appendChild(numberSubmitContainer);
    }
};


// Adds an event listener to the word input and publishes the submitted word to
// be checked against the selected letters and words array.
NumbersGameView.prototype.setupEventListener = function () {

      this.showNumbers();
      const round = this.round;
      let solution1;
      let solution2;

      this.elements[0].addEventListener('submit', function(event) {

        event.preventDefault();
        const form = event.target;
        solution1 = event.target.word.value;
        form.reset();

      });

      this.elements[1].addEventListener('submit', function(event) {

        event.preventDefault();
        const form = event.target;
        solution2 = event.target.word.value;

        PubSub.publish(`NumbersGameView:submitted-solution-p1${round}`, solution1);
        PubSub.publish(`NumbersGameView:submitted-solution-p2${round}`, solution2);

        form.reset();

      });

};

module.exports = NumbersGameView;