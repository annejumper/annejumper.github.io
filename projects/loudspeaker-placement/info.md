---
title: "Loudspeaker Placement and Room Acoustics"
summary: "Measuring how a speaker's frequency response changes as it moves away from a wall, using exponential sine sweeps, deconvolution and a calibrated microphone."
categories: ["Acoustics"]
tools: ["MATLAB", "Exponential sine sweep + inverse filter", "FFT", "Dayton Audio iMM-6 (calibrated)", "JBL Flip 7"]
course: "Instruments and Experiments (ME 70)"
date: "Spring 2026"
sortDate: "2026-05"
team: "Team of 2 (with Zachary Siminoff)"
role: ""
featured: 0
hero: "./hero.png"
heroAlt: "Calibrated frequency response curves for twelve speaker positions, 0 to 33 cm from the wall"
gallery:
  - src: "./media/setup.png"
    caption: "Setup: the JBL Flip 7 moved away from the wall in 3 cm steps toward a Dayton Audio iMM-6 microphone about 1 m away"
    group: "Experiment"
  - src: "./media/frequency-response.png"
    caption: "Calibrated, smoothed frequency response at every position (0–33 cm from the wall)"
    group: "Results"
  - src: "./media/sweep-envelopes.png"
    caption: "Time-aligned sweep envelopes: about 50 dB of signal over a ~30 dB noise floor"
    group: "Results"
videos: []
documents:
  - title: "Lab Report"
    file: "docs/project-report.pdf"
    description: "Background, methods, results and discussion"
links: []
source: ""
guessed: ["summary", "writeup", "tools"]  # fields Claude drafted — remove once confirmed
---
Speaker specs usually promise a frequency response within ±3 dB, measured in an anechoic chamber. My partner Zachary Siminoff and I wanted to know how much of that holds up in a normal room. Our question was how moving a speaker away from a wall, and toward the microphone, changes the reflections that reach the microphone and therefore the measured response.

## Method

- **Test signal.** In MATLAB, we generated a 5-second exponential sine sweep from 20 Hz to 20 kHz at 48 kHz. The sweep spends equal time in each octave, so the whole audible range is excited evenly. We also generated a matching inverse filter: the time-reversed sweep with an amplitude envelope that compensates for the extra energy at low frequencies.
- **Measurements.** The speaker started flat against the wall and moved toward the microphone in 3 cm steps, from 0 to 33 cm, for twelve positions. At each position we played the sweep and recorded the room's response.
- **Impulse response.** Convolving each recording with the inverse filter cancels out the sweep and leaves the impulse response of the speaker plus the room. The script aligns every recording on the direct-sound peak and trims the decaying tail to a fixed length, so all positions are compared on equal terms.
- **Frequency response.** We took an FFT of each impulse response, converted the magnitude to dB, and corrected it with the microphone's own calibration file, interpolated onto the FFT bins. Gaussian smoothing then removed measurement noise while keeping the interference dips.

## Results

- **Below ~1 kHz, the results follow a clear trend.** Against the wall, the bass boost is strongest, because the wall reflection arrives almost in phase with the direct sound and adds to it. Moving the speaker out to 27 cm lowers the bass peak step by step as the reflection's delay grows. The 30 and 33 cm curves break the pattern, most likely because the setup shifted between trials.
- **Above ~2 kHz, the curves are irregular.** The wavelengths are short enough that millimeter-scale changes in position move the comb-filter peaks and dips. Here the spread between curves shows positioning sensitivity more than a wall-distance trend.
- **Noise was not a factor.** The signal was about 50 dB over a ~30 dB noise floor, a 20 dB SNR. Subtracting the noise in the power domain changes the level by less than 0.005 dB, far below the ~1 dB a listener could hear.
- **Takeaway.** Across the twelve positions, the response at a given frequency varied by up to ±15 dB, about five times the ±3 dB a manufacturer would quote. In a real room, frequency response is a property of the speaker, the room and the speaker's exact position, not of the speaker alone.

Next, we'd like to repeat the measurements with finer position steps and in rooms of different sizes, and compare them with a simulated room in COMSOL or REW.
