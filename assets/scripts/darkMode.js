function switchMode(darkMode, animated) {
  const switchingClasses = [
    // Background colors
    ['bg-white', 'bg-gray-dark'],
    ['bg-gray-light', 'bg-gray-super-dark'],

    // Font colors
    ['text-gray-dark', 'text-white-fromGrayDark'],
    ['text-gray', 'text-white-fromGray'],
    ['link-gray-dark', 'link-white-fromGrayDark'],
    ['link-blue', 'link-white-fromBlue'],
    ['link-blueGray', 'link-gray-fromBlue'],

    // Border colors
    ['border-gray-light', 'border-dark'],

    // Nav Bar colors
    ['nav-gray', 'nav-white-fromGray']
  ];

  for (let classSwitch of switchingClasses) {
    const class1 = classSwitch[darkMode ? 0 : 1];
    const class2 = classSwitch[darkMode ? 1 : 0];
    $('.' + class1).each(function() {
      if (animated) {
        $(this).css('transition', '0.3s');
      } else {
        $(this).css('transition', '');
      }
      if (!$(this).hasClass('ignore-dark-mode')) $(this).removeClass(class1).addClass(class2);
    });
  }
}

const darkModeKey = 'DARK_MODE';

let darkMode = localStorage.getItem(darkModeKey) || false;
darkMode = typeof(darkMode) === 'string' ? (darkMode === 'true' ? true : false) : darkMode;

// On Load
$(function() {
  $("#lightDarkSwitch").prop('checked', darkMode);
  switchMode(darkMode, false);
});

// On Ready
$('document').ready(function() {
  $("#lightDarkSwitch").change(function() {
    darkMode = !darkMode;
    localStorage.setItem(darkModeKey, darkMode);
    switchMode(darkMode, true);
  });
});
