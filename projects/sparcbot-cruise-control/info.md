---
title: "SparcBot Cruise Control"
summary: "From motor modeling to trajectory tracking: system identification, PD balancing of an inverted pendulum, PI control with anti-windup, feedforward + PI cruise control, and full-state feedback with observability on a differential-drive robot we assembled."
categories: ["Controls", "Robotics & Electronics"]
tools: ["Python", "ROS 2", "Raspberry Pi", "System identification", "PID + feedforward", "Full-state feedback", "Observability analysis"]
course: "Digital Control of Dynamic Systems (ME 130)"
date: "Fall 2026 (in progress)"
sortDate: "2026-11"
team: "Team of 2 (with Zack Siminoff)"
role: ""
featured: 2
hero: "./hero.jpg"
heroAlt: "The SparcBot differential-drive robot about to drive up a cardboard ramp"
gallery:
  - src: "./media/motor-characterization.png"
    caption: "Motor characterization sweep: output speed vs. duty command, with a ±0.025 deadband removed"
    group: "Lab 2: modeling and pendulum balancing"
  - src: "./media/step-response.png"
    caption: "Step-response fit of the second-order pendulum model"
    group: "Lab 2: modeling and pendulum balancing"
  - src: "./media/frequency-response.png"
    caption: "Frequency-response fit (Bode magnitude and phase), used for the PD design"
    group: "Lab 2: modeling and pendulum balancing"
  - src: "./media/p-control.png"
    caption: "P control alone: the wheel settles near 3.3 rad/s against a 2π rad/s command (steady-state error)"
    group: "Lab 3: wheel-speed PI control"
  - src: "./media/pi-control.png"
    caption: "PI control removes the steady-state error"
    group: "Lab 3: wheel-speed PI control"
  - src: "./media/windup.png"
    caption: "Integrator windup: with the wheel held, the unsaturated command ramps to 2.5 and the wheel overshoots to ~57 rad/s on release"
    group: "Lab 3: wheel-speed PI control"
  - src: "./media/anti-windup.png"
    caption: "With anti-windup, the command holds at saturation and the release overshoot is about half (~29 rad/s)"
    group: "Lab 3: wheel-speed PI control"
  - src: "./media/spin-steps.png"
    caption: "Angular-velocity step test (spinning in place), both wheels"
    group: "Lab 5: cruise control on SparcBot"
  - src: "./media/velocity-steps.png"
    caption: "Linear-velocity step test (0.25, −0.5, 0.75 m/s)"
    group: "Lab 5: cruise control on SparcBot"
  - src: "./media/ramp-teleop.png"
    caption: "Driving onto the ramp: dips as the front wheels, then the rear wheel, reach the cardboard, then a slower recovery up the incline"
    group: "Lab 5: cruise control on SparcBot"
videos:
  - title: "Balancing the inverted pendulum"
    file: "media/videos/pendulum-balance.mp4"
    poster: "./media/videos/pendulum-balance.jpg"
    youtube: ""
    description: "PD controller with gains from pole placement on the identified model."
  - title: "Open-loop driving before feedback (Lab 4)"
    file: "media/videos/sparcbot-top-view.mp4"
    poster: "./media/videos/sparcbot-top-view.jpg"
    youtube: ""
    description: "Freshly assembled SparcBot driven forward, backward and spinning in place with raw PWM commands from the keyboard. Without feedback it doesn't track straight lines or spin cleanly about its axle."
  - title: "Driving up a changing slope"
    file: "media/videos/ramp-drive.mp4"
    poster: "./media/videos/ramp-drive.jpg"
    youtube: ""
    description: "Constant commanded speed while the robot drives from the floor onto a cardboard ramp."
documents: []
links:
  - label: "Labs 2–3 code (ME130_Lab2)"
    url: "https://github.com/annejumper/ME130_Lab2"
  - label: "Lab 5 controller changes (SparcBot)"
    url: "https://github.com/annejumper/sparcbot/commit/aa22818"
  - label: "Lab 6 circle tracker (SparcBot)"
    url: "https://github.com/annejumper/sparcbot/blob/main/src/sparcbot_control/sparcbot_control/circle_tracker.py"
source: ""
guessed: ["summary", "writeup", "tools"]  # fields Claude drafted — remove once confirmed
---
Over the semester, my partner Zack Siminoff and I have been building up a cruise controller for a small differential-drive robot, one lab at a time. The teaching team wrote the ROS 2 framework, drivers and logging. Our work was to model the hardware, write the control laws, and tune them against measured data.

## Lab 2: modeling a motor and balancing a pendulum

- **Motor characterization.** We swept the duty command from −1 to 1 and measured output speed. The response is close to linear, apart from a deadband of ±0.025 around zero, which we compensated for so the controller sees a linear plant.
- **System identification.** With the pendulum hanging down, we fit the linearized model φ̈ + bφ̇ + cφ = Ku from both a step response and a sinusoidal frequency sweep. The two fits disagreed widely (K ≈ 2.5 from the steps vs. ≈ 54 from the sweep). The free responses didn't settle to zero, so we used the frequency-response fit. The measured resonance peak was also sharper than the model predicts, because constant damping doesn't capture what happens near resonance. Other likely causes were large angles beyond the small-angle approximation and parts that worked loose during testing.
- **PD balancing.** Linearizing about the upright position flips the sign of the c term, so the open loop is unstable. Using the frequency-response model, we placed the closed-loop poles at ζ = 1 and ω = 15 rad/s and solved for the PD gains. The controller balanced the pendulum upright (video below).

## Lab 3: wheel-speed PI control with anti-windup

- **P only** left a large steady-state error: the wheel settled near 3.3 rad/s against a 2π rad/s command.
- **Adding integral action** brought the wheel to the setpoint in about 2 s.
- **Windup.** When we held the wheel still, the integrator kept growing, so the unsaturated command climbed to 2.5 while the actual output was capped at 1.0. On release, the wheel overshot to ~57 rad/s. We added conditional integration, which pauses the integrator whenever the output is saturated and the error would push it further. That cut the overshoot roughly in half. Debugging the windup plot also showed that our duty command had the wrong sign.

## Lab 4: building SparcBot

We assembled the robot from two of the motor, encoder and driver units used in the earlier labs, with a Raspberry Pi, a breadboard and a caster. Then we drove it with open-loop PWM from the keyboard. Without feedback it drifted off straight lines and didn't spin cleanly in place (video below), which set up the need for closed-loop speed control.

## Lab 5: cruise control on SparcBot

- **Controller.** Each wheel runs feedforward on the target velocity, plus P and I feedback on a lightly filtered velocity error, plus breakaway compensation that adds a fixed offset in the direction of motion to overcome static friction.
- **Step tests.** Spinning-in-place and forward/backward steps track the command within the ±⅓ band and the 0.5 s settling target. There is some overshoot on the largest step.
- **Changing slope.** At a constant commanded speed, the logged wheel velocities dip as the front wheels, then the rear wheel, reach the ramp, and again at the start of the incline, where the controller recovers more slowly. The noise in the measured velocity turned out to come from the sensing, not from our gains.

## Lab 6: tracking a circle, and why dead reckoning drifts

With wheel speeds under control, the next layer is a **full-state feedback** controller that generates v and ω to make SparcBot drive a circle (r = 0.4 m at v<sub>d</sub> = 0.2 m/s, ω<sub>d</sub> = 0.5 rad/s, one lap every 4π s). The robot estimates its pose (x, y, θ) by integrating its encoder wheel speeds, known as dead reckoning. The tracking error is expressed in the robot's frame (forward, lateral and heading error), and linearizing the unicycle model about the circle gives constant error dynamics ė = A e + B δu. The system is reachable, so the controller u = −K e + [v<sub>d</sub> ω<sub>d</sub>]ᵀ can place the closed-loop poles anywhere. Using gains k₁ = −3 (forward error → v) and k₅ = −8.75, k₆ = −3 (lateral and heading error → ω) places them at −1, −2 and −3.

We drove four laps back to back without moving the robot, measuring where it actually ended after each one, in two experiments:

- **Dead reckoning only.** The only measurements are wheel speeds, so C = 0 and the observability matrix W<sub>o</sub> = [C; CA; CA²] has **rank 0**: nothing the robot measures reveals its pose error. Every lap started from the previous lap's erroneous endpoint, so the error accumulated: the robot ended 25 cm from the start after lap 1 and 76 cm away after lap 4, with its heading off by 123°.
- **With pose correction.** After each lap we measured the robot's real pose and sent it to the odometry (a `set_pose` call). Measuring x, y and θ directly adds an identity block to C, and W<sub>o</sub> has **full rank (3)**, so the system becomes observable. The endpoints stayed within about 5 cm of each other across all four laps, with headings of 24–32°.

![Where the robot ended after each lap, with and without pose correction](./media/lab6-endpoints.png)

In both experiments the first lap ended about 25 cm from the start, so a single lap already picks up noticeable error. The difference is that correction stops it from compounding. Sources of error we identified: when the car accelerates it tips forward, lifting the rear caster and unevenly loading the front wheels, which causes slip that the encoders count as motion. It also jitters and creeps after stopping, before we could stop the driver, so the pose changed slightly between the lap's end and our measurement. Smaller contributions come from wheel-radius and base-width errors, encoder noise, mismatched left and right motors, and our own tape-measure readings.

The remaining labs build on this controller. I'll add them here as the course goes on.
