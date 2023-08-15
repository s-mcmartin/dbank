import { d_bank } from "../../declarations/d_bank/index";

window.addEventListener("load", async function() {
  // console.log("Finished loading");
  update();
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault();
  // console.log("Submitted.");

  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await d_bank.topUp(inputAmount);
    console.log('input', inputAmount);
  }

  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await d_bank.withdraw(outputAmount);
    console.log('output', outputAmount);
  }

  await d_bank.compound();

  update()

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled");

});

async function update() {
  const currentAmount = await d_bank.checkBalance();
  console.log('current', currentAmount);
  document.getElementById("value").innerHTML = Math.round(currentAmount);
};