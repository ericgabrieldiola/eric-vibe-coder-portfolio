const $ = (selector) => document.querySelector(selector);
const themeToggle = $('#themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  themeToggle.textContent = document.body.classList.contains('light-theme') ? '☾' : '☼';
});

const guides = {
  wifi: {
    title: "Wi-Fi won't connect",
    intro: "Let's check the connection in a safe order.",
    questions: [
      {q:"Can your device see the Wi-Fi network?",help:"Look at the available networks list.",yes:"visible",no:"not-visible"},
      {q:"Can another device connect to the same network?",help:"If possible, test a phone or another computer.",yes:"other-works",no:"other-fails"},
      {q:"Have you already restarted your device?",help:"Save your work before restarting.",yes:"restarted",no:"not-restarted"}
    ],
    outcomes: {
      visible:{title:"The network is visible",steps:["Make sure Airplane mode is off and Wi-Fi is enabled.","Confirm you're selecting the correct network and enter the password carefully.","Try forgetting the network and reconnecting if you know the password.","If it still fails, use the operating system's network troubleshooter."]},
      "not-visible":{title:"The network isn't visible",steps:["Move closer to the router or hotspot.","Confirm the router/hotspot is powered on and broadcasting its network.","Turn Wi-Fi off and back on using normal system settings.","If no networks appear at all, use the built-in troubleshooter or ask IT support to check the wireless adapter."]},
      "other-works":{title:"Other devices connect successfully",steps:["The issue may be specific to this device.","Toggle Wi-Fi off and back on in system settings.","Check the saved password and reconnect to the correct network.","Restart the device; if the problem remains, use the built-in network troubleshooter."]},
      "other-fails":{title:"Other devices also fail",steps:["Check whether the router or hotspot shows an error or has lost internet service.","If you control the router, restart it using its normal power procedure.","Check with your internet provider or network administrator for an outage or access restriction.","Avoid factory-resetting the router unless the owner or administrator instructs you to."]},
      restarted:{title:"You've already restarted",steps:["Check whether the device has an available system update from its official settings.","Run the built-in network troubleshooter.","If the issue began after a driver update, ask a technician or IT administrator to review the adapter and driver. Avoid downloading drivers from unofficial sites."]},
      "not-restarted":{title:"Try a normal restart first",steps:["Save open files and close your apps.","Restart the computer or phone using the normal power menu.","Reconnect to the Wi-Fi network and test a trusted website.","If it still fails, return and choose the closest matching answer."]}
    }
  },
  slow: {
    title:"Computer is slow",
    intro:"Let's check common causes before changing system settings.",
    questions:[
      {q:"Is the computer slow all the time or only in one app?",help:"Think about when the slowdown happens.",yes:"one-app",no:"whole-device"},
      {q:"Is your storage nearly full?",help:"Check Storage in system settings.",yes:"low-space",no:"space-ok"},
      {q:"Have you restarted the computer recently?",help:"Save your work before restarting.",yes:"slow-restarted",no:"slow-not-restarted"}
    ],
    outcomes:{
      "one-app":{title:"One app seems to be the issue",steps:["Close and reopen that app after saving your work.","Close tabs or files you aren't using.","Check the app's official updates and system requirements.","If the issue continues, note any error message and ask support."]},
      "whole-device":{title:"The whole computer is slow",steps:["Save your work and restart the computer.","Close apps that aren't needed.","Open Task Manager (Windows) or Activity Monitor (macOS) to check which apps use high CPU or memory.","Run a security scan using the security software already installed."]},
      "low-space":{title:"Storage is running low",steps:["Review storage usage in system settings.","Use the operating system's built-in temporary-file cleanup tool.","Check the Recycle Bin/Trash before emptying it.","Back up personal files before removing them; never delete unfamiliar system folders."]},
      "space-ok":{title:"Storage may not be the cause",steps:["Check whether one app is using unusually high CPU or memory.","Install pending updates from official system settings when convenient.","Run a scan with your existing security software.","If slowdown started suddenly or warnings appear, stop and ask trusted IT support."]},
      "slow-restarted":{title:"You've already restarted",steps:["Check available storage and app/resource usage.","Install operating-system updates from official settings if available.","Run the built-in security scan.","If the device is overheating, shutting down unexpectedly, or making unusual noises, stop using it and seek qualified support."]},
      "slow-not-restarted":{title:"Try a normal restart",steps:["Save your work and close open applications.","Restart from the system's normal power menu.","Open only the apps you need and see whether performance improves.","If it remains slow, use the other checks in this guide."]}
    }
  },
  sound: {
    title:"No sound",
    intro:"Check volume and the selected output device first.",
    questions:[
      {q:"Is the volume muted or very low?",help:"Check both app volume and system volume.",yes:"muted",no:"volume-ok"},
      {q:"Are you using headphones or external speakers?",help:"Include Bluetooth audio devices.",yes:"external",no:"built-in"},
      {q:"Does sound work in another app?",help:"Try a trusted video or system test sound.",yes:"other-app-works",no:"no-app-works"}
    ],
    outcomes:{
      muted:{title:"Volume may be the cause",steps:["Turn up system volume and the app's own volume.","Check whether mute is enabled in the app.","Test sound again using a familiar, trusted audio source."]},
      "volume-ok":{title:"Check the output device",steps:["Open sound settings and select the intended output device.","Disconnect and reconnect headphones or speakers.","If using Bluetooth, check that the device is connected and selected as the output."]},
      external:{title:"Check the external audio device",steps:["Check the speaker/headphone power and volume.","Reconnect the cable or reconnect the Bluetooth device using normal settings.","Select the correct output device in sound settings.","Try the headphones or speakers with another compatible device if available."]},
      built-in:{title:"Check built-in audio",steps:["Check system volume and the selected output device.","Run the operating system's built-in audio troubleshooter.","Restart the device after saving your work.","If audio still fails, ask IT support to review official audio drivers and settings."]},
      "other-app-works":{title:"It may be an app-specific issue",steps:["Check the affected app's volume and mute settings.","Check whether the app is sending sound to a different output device.","Restart or update the app from its official source."]},
      "no-app-works":{title:"Sound fails across apps",steps:["Select the correct output device in system settings.","Reconnect the audio device and restart the computer if practical.","Run the built-in audio troubleshooter.","If the issue persists, ask a technician to check system audio settings and drivers."]}
    }
  },
  printer: {
    title:"Printer won't print",
    intro:"Check power, connection, and the print queue.",
    questions:[
      {q:"Is the printer powered on and showing an error?",help:"Check its display or status lights.",yes:"printer-error",no:"printer-ready"},
      {q:"Is the printer connected to the same network or computer?",help:"Check Wi-Fi or the cable connection.",yes:"printer-connected",no:"printer-disconnected"},
      {q:"Are documents stuck in the print queue?",help:"Open the printer queue on your computer.",yes:"queue-stuck",no:"queue-clear"}
    ],
    outcomes:{
      "printer-error":{title:"The printer reports an error",steps:["Read the printer display or status message.","Check paper, ink/toner, and whether a paper jam is reported; follow the manufacturer's safe instructions.","Use the printer maker's official support guide for the exact error."]},
      "printer-ready":{title:"Printer appears ready",steps:["Confirm the correct printer is selected in the print dialog.","Print a test page using the operating system's printer settings if available.","Check the connection and print queue."]},
      "printer-connected":{title:"Connection appears to be in place",steps:["Confirm the correct printer is selected.","Check its status in system settings.","Open the print queue and look for paused or stuck jobs.","Restart the printer using its normal power button if needed."]},
      "printer-disconnected":{title:"Check the connection",steps:["For USB, check the cable is securely connected.","For Wi-Fi printers, verify it is on the intended network.","Follow the manufacturer's official steps to reconnect the printer.","Ask the network owner or IT support if this is a managed printer."]},
      "queue-stuck":{title:"A print job may be stuck",steps:["Check that you selected the correct printer.","Cancel only jobs you recognize and intend to remove.","Resume printing if the queue is paused.","If the queue remains stuck, follow official operating-system support instructions."]},
      "queue-clear":{title:"The queue looks clear",steps:["Try printing a test page.","Check printer status and selected device.","Restart the printer and computer if you can save your work first.","Use the manufacturer's support page if the issue continues."]}
    }
  },
  storage: {
    title:"Storage is almost full",
    intro:"We'll identify safe ways to free space without removing important data.",
    questions:[
      {q:"Does system settings show very little free space?",help:"Check the Storage section in system settings.",yes:"confirmed-full",no:"not-confirmed-full"},
      {q:"Do you have personal files backed up?",help:"For example, in a trusted external drive or cloud account.",yes:"backed-up",no:"not-backed-up"},
      {q:"Have you checked the built-in cleanup recommendations?",help:"Use system settings rather than third-party cleaners.",yes:"cleanup-done",no:"cleanup-not-done"}
    ],
    outcomes:{
      "confirmed-full":{title:"Storage is low",steps:["Review which categories use the most space in system settings.","Use the operating system's built-in temporary-file cleanup tool.","Review large downloads and duplicate personal files carefully.","Empty Trash/Recycle Bin only after checking its contents."]},
      "not-confirmed-full":{title:"Check the storage report again",steps:["Open system settings and locate Storage.","Check which drive is being reported and how much free space remains.","If a warning appears in an app rather than system settings, note the exact message."]},
      "backed-up":{title:"Review files carefully",steps:["Confirm the backup is complete and accessible.","Remove only personal files you recognize and no longer need.","Use built-in cleanup recommendations for temporary files.","Keep at least one reliable copy of important documents and photos."]},
      "not-backed-up":{title:"Back up important files first",steps:["Copy important personal files to a trusted backup location.","Open a few backed-up files to verify the copy worked.","Then use the operating system's built-in cleanup tool.","Do not delete files you don't recognize."]},
      "cleanup-done":{title:"Built-in cleanup has been checked",steps:["Review large personal files and apps you recognize and no longer use.","Back up personal files before moving or deleting them.","If system storage still seems incorrect, ask IT support rather than deleting system folders."]},
      "cleanup-not-done":{title:"Try the built-in cleanup tool",steps:["Open Storage settings and review the cleanup recommendations.","Read each item before removing it.","Avoid removing Downloads or personal files unless you have checked them.","Check free space again afterward."]}
    }
  },
  input: {
    title:"Keyboard or mouse isn't responding",
    intro:"Start with the connection and power, without opening the computer.",
    questions:[
      {q:"Is the keyboard or mouse wired or wireless?",help:"Choose the closest option.",yes:"wireless",no:"wired"},
      {q:"Does it have power or show signs of connection?",help:"Check battery, lights, or connection status.",yes:"powered",no:"no-power"},
      {q:"Does it work on another USB port or compatible device?",help:"Only test this if it's safe and convenient.",yes:"works-elsewhere",no:"fails-elsewhere"}
    ],
    outcomes:{
      wireless:{title:"Wireless device checks",steps:["Check its power switch and battery/charge.","Reconnect it using the manufacturer's normal pairing instructions.","Check Bluetooth or the wireless receiver connection in system settings.","Avoid unknown pairing tools or driver download sites."]},
      wired:{title:"Wired device checks",steps:["Reconnect the cable securely.","Try another known-working USB port if available.","Check whether the cable or connector looks damaged; don't use damaged equipment.","Restart the computer after saving your work."]},
      powered:{title:"The device appears to have power",steps:["Try another app to confirm the issue isn't limited to one program.","Reconnect the device or pair it again through normal system settings.","Restart the computer after saving work.","If only some keys/buttons fail, the device may need cleaning or professional inspection."]},
      "no-power":{title:"Check power or connection",steps:["For wireless devices, charge or replace the battery according to the maker's instructions.","For wired devices, try a known-working port.","Check the connector for visible damage and stop using it if damaged.","Ask a technician if the device still shows no power."]},
      "works-elsewhere":{title:"The device works elsewhere",steps:["The issue may be with the original computer's port, settings, or driver.","Restart the computer after saving work.","Use the built-in device troubleshooter or ask IT support to check settings.","For managed devices, don't change administrator-controlled settings."]},
      "fails-elsewhere":{title:"The device fails on another connection too",steps:["Check its battery, cable, and manufacturer's connection instructions.","If it is damaged or still doesn't respond, it may need repair or replacement.","If the device is under warranty, contact the manufacturer before opening it."]}
    }
  }
};

let activeIssue = null;
let stepIndex = 0;
let sessionAnswers = [];

const diagnosis = $('#diagnosis');
const diagnosisTitle = $('#diagnosisTitle');
const questionArea = $('#questionArea');
const answerArea = $('#answerArea');
const resultArea = $('#resultArea');
const progressFill = $('#progressFill');
const stepCount = $('#stepCount');

document.querySelectorAll('[data-issue]').forEach(button => {
  button.addEventListener('click', () => startDiagnosis(button.dataset.issue));
});

function startDiagnosis(issue) {
  activeIssue = issue;
  stepIndex = 0;
  sessionAnswers = [];
  diagnosis.hidden = false;
  diagnosisTitle.textContent = guides[issue].title;
  resultArea.hidden = true;
  resultArea.replaceChildren();
  $('#common-issues').scrollIntoView({behavior:'smooth', block:'start'});
  renderQuestion();
}
function renderQuestion() {
  const guide = guides[activeIssue];
  const current = guide.questions[stepIndex];
  resultArea.hidden = true;
  questionArea.replaceChildren();
  answerArea.replaceChildren();
  const title = document.createElement('h3');
  title.className = 'question-title';
  title.textContent = current.q;
  const help = document.createElement('p');
  help.className = 'question-help';
  help.textContent = current.help;
  questionArea.append(title, help);
  stepCount.textContent = `STEP ${stepIndex + 1} OF ${guide.questions.length}`;
  progressFill.style.width = `${((stepIndex + 1) / guide.questions.length) * 100}%`;

  const choices = [
    {label:'Yes', sub:'This matches my situation', key:'yes'},
    {label:'No', sub:'This does not match', key:'no'}
  ];
  choices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'answer-option';
    button.innerHTML = '';
    const strong = document.createElement('strong');
    strong.textContent = choice.label;
    const span = document.createElement('span');
    span.textContent = choice.sub;
    button.append(strong, span);
    button.addEventListener('click', () => {
      const resultKey = current[choice.key];
      sessionAnswers.push({question:current.q, answer:choice.label});
      showOutcome(resultKey);
    });
    answerArea.appendChild(button);
  });
}
function showOutcome(key) {
  const outcome = guides[activeIssue].outcomes[key];
  questionArea.replaceChildren();
  answerArea.replaceChildren();
  progressFill.style.width = '100%';
  stepCount.textContent = 'RECOMMENDED NEXT STEPS';
  resultArea.replaceChildren();
  const title = document.createElement('h3');
  title.textContent = outcome.title;
  const intro = document.createElement('p');
  intro.textContent = 'Try these steps in order. Stop if a step does not feel safe or you are unsure.';
  const list = document.createElement('ol');
  outcome.steps.forEach(step => {
    const li = document.createElement('li');
    li.textContent = step;
    list.appendChild(li);
  });
  const feedback = document.createElement('p');
  feedback.className = 'feedback-question';
  feedback.textContent = 'Did this solve your problem?';
  const actions = document.createElement('div');
  actions.className = 'result-actions';
  const yes = document.createElement('button');
  yes.className = 'success-btn';
  yes.textContent = '✓ Yes, it worked';
  yes.addEventListener('click', () => showFeedback('Great! Glad the steps helped. You can choose another issue if you need help with something else.'));
  const no = document.createElement('button');
  no.textContent = 'Not yet — what now?';
  no.addEventListener('click', () => showFeedback('Try the next general check: restart the affected device after saving your work, then use the built-in troubleshooter or the manufacturer’s official support page. If the issue persists, ask a trusted technician or IT administrator.'));
  const restart = document.createElement('button');
  restart.textContent = 'Restart diagnosis';
  restart.addEventListener('click', () => startDiagnosis(activeIssue));
  actions.append(yes, no, restart);
  resultArea.append(title, intro, list, feedback, actions);
  resultArea.hidden = false;
}
function showFeedback(message) {
  const existing = resultArea.querySelector('.feedback-result');
  if (existing) existing.remove();
  const note = document.createElement('p');
  note.className = 'feedback-result';
  note.textContent = message;
  resultArea.appendChild(note);
  note.scrollIntoView({behavior:'smooth',block:'nearest'});
}
$('#changeIssue').addEventListener('click', () => {
  diagnosis.hidden = true;
  $('#common-issues').scrollIntoView({behavior:'smooth',block:'start'});
});
$('#resetSession').addEventListener('click', () => {
  if (activeIssue) startDiagnosis(activeIssue);
});
