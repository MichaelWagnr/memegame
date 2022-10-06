// This class is not used in the project yet.
class Text {
  // The constructor has three parameters. Here is an example of how you would create
  // an instance of this class
  constructor(root, xPos, yPos) {
    const div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.left = xPos;
    div.style.top = yPos;
    div.style.color = 'white';
    div.style.font = 'bold 30px Impact';
    div.style.zIndex = 2000;

    root.appendChild(div);

    this.domElement = div;
  }

  update(txt) {
    this.domElement.innerText = txt;
  }
}
