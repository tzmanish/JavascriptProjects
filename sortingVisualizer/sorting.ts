"use strict";

async function delay(ms: number): Promise<void>{
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

class SortingElement{
  public value: number;
  public element: HTMLElement;

  constructor(elementNumber: number){
    this.value = Math.floor(Math.random() * 100) + 1;
    this.element = document.createElement("span");
    this.element.classList.add("sortingElement");
    this.element.id = "element"+elementNumber;
    this.element.style.height = this.value+"%";
  }

  updateValue(newValue: number): void{
    this.value = newValue;
    this.element.style.height = newValue+"%";
  }

  highlightState(state: number){
    switch(state){
      case 1:
        this.element.style.border = "thick solid red";
        break;
      case 2:
        this.element.style.border = "thick solid blue";
        break;
      default:
        this.element.style.border = "none";
    }
  }
}

class Sorter{
  private container: HTMLElement = document.getElementById("container");
  private countInput: HTMLInputElement = document.getElementById("elementCount") as HTMLInputElement;
  private elements: SortingElement[];
  private delayAmount: number = 100;
  public visualsEnabled: boolean = true;
  public fastForward: boolean = false;

  constructor(){
    this.elements = [];
    this.container.innerHTML = "";
    this.updateCount(+this.countInput.value);
  }

  updateCount(count: number): void{
    console.log(count)
    while(count>this.elements.length){
      let newElement: SortingElement = new SortingElement(this.elements.length);
      this.elements.push(newElement);
      this.container.appendChild(newElement.element);
    } 
    while(count<this.elements.length){
      let removedElement: SortingElement = this.elements.pop();
      removedElement.element.remove();
    }
  }

  async blinkSwap(a: number, b: number): Promise<void>{
    let temp: number = this.elements[a].value;
    if(this.visualsEnabled){
      this.elements[a].highlightState(2);
      this.elements[b].highlightState(2);
      await delay(this.delayAmount);
      this.elements[a].highlightState(1); 
      this.elements[b].highlightState(1);

      this.elements[a].updateValue(this.elements[b].value);
      this.elements[b].updateValue(temp);
    
      await delay(this.delayAmount/2);
      this.elements[a].highlightState(0); 
      this.elements[b].highlightState(0); 
    } else {
      this.elements[a].updateValue(this.elements[b].value);
      this.elements[b].updateValue(temp);
    }
  }

  async blink(a: number, b: number): Promise<void>{
    if(!this.visualsEnabled) return;

    this.elements[a].highlightState(1);
    this.elements[b].highlightState(1);
    await delay(this.delayAmount);
    this.elements[a].highlightState(0); 
    this.elements[b].highlightState(0); 
  }

  async bubbleSort(): Promise<{"comparisons", "swaps"}>{
    let comparisons: number = 0, swaps: number = 0;
    for(let i: number = this.elements.length-1; i > 0; i--){
      for(let j: number = 0; j<i; j++){
        let k: number = j+1;
        comparisons++;
        if(this.elements[j].value > this.elements[k].value){
          await this.blinkSwap(j, k);
          swaps++;
        } else {
          await this.blink(j, k);
        }
      }
    }
    if(this.fastForward){
      this.visualsEnabled = true;
      this.fastForward = false;
    }
    return {"comparisons": comparisons, "swaps": swaps};
  }
}

let sorter: Sorter = new Sorter();