const iconOne = document.querySelector(".icon-1");
const iconTwo = document.querySelector(".icon-2");

function btnClick() {
    if (iconOne.style.display === "none") {
        iconOne.style.display = "block";
        iconTwo.style.display = "none"; 
    } else {
        iconOne.style.display = "none";
        iconTwo.style.display = "block"; 
    }
}
