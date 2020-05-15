(function() {
  const input = document.querySelector(".switch input");

  if (input) {
    const darkModeSetting = localStorage.getItem("isDarkModeOn");

    try {
      const isDarkMode =
        darkModeSetting === null ? false : JSON.parse(darkModeSetting);

      if (isDarkMode) {
        input.checked = true;
        document.body.classList.add("dark-theme");
      }
    } catch (error) {}

    input.addEventListener("change", () => {
      document.body.classList.toggle("dark-theme");

      localStorage.setItem("isDarkModeOn", JSON.stringify(input.checked));
    });
  }
})();
