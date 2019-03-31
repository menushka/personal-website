function switchMode(darkMode) {
  const switchingClasses = [
    // Background colors
    ['bg-white', 'bg-gray-dark'],
    ['bg-gray-light', 'bg-gray-super-dark'],

    // Font colors
    ['text-gray-dark', 'text-white'],
    ['text-gray', 'text-white']
  ];

  for (let classSwitch of switchingClasses) {
    const class1 = classSwitch[darkMode ? 0 : 1];
    const class2 = classSwitch[darkMode ? 1 : 0];
    $('.' + class1).each(function() {
      $(this).removeClass(class1).addClass(class2);
    });
  }
}

const darkModeKey = 'DARK_MODE';

let darkMode = localStorage.getItem(darkModeKey) || false;
darkMode = typeof(darkMode) === 'string' ? (darkMode === 'true' ? true : false) : darkMode;

$('document').ready(function() {
  $("#lightDarkSwitch").prop('checked', darkMode);
  
  $("#lightDarkSwitch").change(function() {
    darkMode = !darkMode;
    localStorage.setItem(darkModeKey, darkMode);
    switchMode(darkMode);
  });
});
