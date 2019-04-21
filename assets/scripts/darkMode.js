function switchMode(darkMode, animated) {
  const switchingClasses = {
    '': [
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
      ['nav-gray', 'nav-white-fromGray'],

      // Icon colors
      ['icon-black', 'icon-white-fromBlack']
    ],
    '.highlight': [
      // Code syntax colors
      ['pre', 'dark-pre'],
      ['pre', 'dark-pre'], 
      ['hll', 'dark-hll'], 
      ['c', 'dark-c'], 
      ['err', 'dark-err'], 
      ['g', 'dark-g'], 
      ['k', 'dark-k'], 
      ['l', 'dark-l'], 
      ['n', 'dark-n'], 
      ['o', 'dark-o'], 
      ['x', 'dark-x'], 
      ['p', 'dark-p'], 
      ['cm', 'dark-cm'], 
      ['cp', 'dark-cp'], 
      ['c1', 'dark-c1'], 
      ['cs', 'dark-cs'], 
      ['gd', 'dark-gd'], 
      ['ge', 'dark-ge'], 
      ['gr', 'dark-gr'], 
      ['gh', 'dark-gh'], 
      ['gi', 'dark-gi'], 
      ['go', 'dark-go'], 
      ['gp', 'dark-gp'], 
      ['gs', 'dark-gs'], 
      ['gu', 'dark-gu'], 
      ['gt', 'dark-gt'], 
      ['kc', 'dark-kc'], 
      ['kd', 'dark-kd'], 
      ['kn', 'dark-kn'], 
      ['kp', 'dark-kp'], 
      ['kr', 'dark-kr'], 
      ['kt', 'dark-kt'], 
      ['ld', 'dark-ld'], 
      ['m', 'dark-m'], 
      ['s', 'dark-s'], 
      ['na', 'dark-na'], 
      ['nb', 'dark-nb'], 
      ['nc', 'dark-nc'], 
      ['no', 'dark-no'], 
      ['nd', 'dark-nd'], 
      ['ni', 'dark-ni'], 
      ['ne', 'dark-ne'], 
      ['nf', 'dark-nf'], 
      ['nl', 'dark-nl'], 
      ['nn', 'dark-nn'], 
      ['nx', 'dark-nx'], 
      ['py', 'dark-py'], 
      ['nt', 'dark-nt'], 
      ['nv', 'dark-nv'], 
      ['ow', 'dark-ow'], 
      ['w', 'dark-w'], 
      ['mf', 'dark-mf'], 
      ['mh', 'dark-mh'], 
      ['mi', 'dark-mi'], 
      ['mo', 'dark-mo'], 
      ['sb', 'dark-sb'], 
      ['sc', 'dark-sc'], 
      ['sd', 'dark-sd'], 
      ['s2', 'dark-s2'], 
      ['se', 'dark-se'], 
      ['sh', 'dark-sh'], 
      ['si', 'dark-si'], 
      ['sx', 'dark-sx'], 
      ['sr', 'dark-sr'], 
      ['s1', 'dark-s1'], 
      ['ss', 'dark-ss'], 
      ['bp', 'dark-bp'], 
      ['vc', 'dark-vc'], 
      ['vg', 'dark-vg'], 
      ['vi', 'dark-vi'], 
      ['il', 'dark-il']
    ]
  };

  for (let parent in switchingClasses) {
    if (!switchingClasses.hasOwnProperty(parent)) continue;
    
    for (let classSwitch of switchingClasses[parent]) {
      const class1 = classSwitch[darkMode ? 0 : 1];
      const class2 = classSwitch[darkMode ? 1 : 0];
      $((parent + ' .' + class1).trim()).each(function() {
        if (animated) {
          $(this).css('transition', '0.3s');
        } else {
          $(this).css('transition', '');
        }
        if (!$(this).hasClass('ignore-dark-mode')) $(this).removeClass(class1).addClass(class2);
      });
    } 
  }
}

const darkModeKey = 'DARK_MODE';

let darkMode = localStorage.getItem(darkModeKey) || false;
darkMode = typeof(darkMode) === 'string' ? (darkMode === 'true' ? true : false) : darkMode;

// On Load
$(function() {
  $("#lightDarkSwitch").prop('checked', darkMode);
  switchMode(darkMode, false);
  $("#loadingHider").show();
});

// On Ready
$('document').ready(function() {
  $("#lightDarkSwitch").change(function() {
    darkMode = !darkMode;
    localStorage.setItem(darkModeKey, darkMode);
    switchMode(darkMode, true);
  });
});
