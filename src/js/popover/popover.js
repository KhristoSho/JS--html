export class Popover {
  constructor() {
    this.actualPopovers = [];
  }

  init() {
    this.addDocListener();
  }

  addDocListener() {
    document.addEventListener("DOMContentLoaded", () => {
      const btnToggle = document.querySelector(".toggle-popover");

      btnToggle.addEventListener("click", () => {
        const actualPopover = this.actualPopovers.find(
          (popover) => popover[0] === btnToggle,
        );

        if (actualPopover) {
          actualPopover[1].remove();
          this.actualPopovers = this.actualPopovers.filter(
            (popover) => popover[0] !== btnToggle,
          );
        } else {
          this.createPopover(btnToggle);
        }
      });
    });
  }

  createPopover(btn) {
    const html =
      '<div class="popover__header">Popover title</div><div class="popover__body">Some text for popover</div>';
    const popover = document.createElement("div");

    popover.classList.add("popover");
    popover.innerHTML = html.trim();

    btn.insertAdjacentElement("beforebegin", popover);

    const btnRect = btn.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const leftPos = btnRect.left + btnRect.width / 2 - popoverRect.width / 2;
    const topPos = btnRect.top - popoverRect.height - 7;

    popover.style.left = leftPos + "px";
    popover.style.top = topPos + "px";
    this.actualPopovers.push([btn, popover]);
  }
}

// <div class="popover">
//     <div class="popover__header">Popover title</div>
//     <div class="popover__body">Some text for popover</div>
// </div>
