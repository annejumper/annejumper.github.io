---
title: "Bubble Bike"
summary: "Senior design project for Dr. Zigs: a bike-mounted bubble machine that keeps producing bubbles while riding, without sloshing, foaming or spilling its solution."
categories: ["Design", "Simulation", "Fabrication", "Robotics & Electronics"]
tools: ["COMSOL 6.4 (two-phase flow, moving mesh)", "Laser cutting", "Peristaltic pump", "DC gear motors"]
course: "Senior Design"
date: "Fall 2026"
sortDate: "2026-11"
team: "Team of 4 (with Ani Gregori Asadourian, Jake McPherson and Zack Siminoff)"
role: ""
featured: 1
hero: "./hero.jpg"
heroAlt: "Prototype 1 of the Bubble Bike: a laser-cut wooden enclosure engraved with the Dr. Zigs logo, with a blue bubble wand on the side"
gallery:
  - src: "./media/prototype-overview.png"
    caption: "Prototype 1 overview: pump, reservoir, wand drive, fan and power, labeled"
    group: "Prototype 1"
  - src: "./media/open-front.jpg"
    caption: "Inside: reservoir, peristaltic pump, wand motor, fan and battery in separate compartments"
    group: "Prototype 1"
  - src: "./media/open-three-quarter.jpg"
    caption: "Opened enclosure, three-quarter view"
    group: "Prototype 1"
  - src: "./media/open-fan-side.jpg"
    caption: "Opened enclosure from the wand side"
    group: "Prototype 1"
  - src: "./media/front.jpg"
    caption: "Closed enclosure with air vents (153 × 70 × 145 mm, 750 g)"
    group: "Prototype 1"
  - src: "./media/fan-side.jpg"
    caption: "The rotating bubble wand"
    group: "Prototype 1"
  - src: "./media/reservoir-side.jpg"
    caption: "Reservoir side: reuses a Dr. Zigs bubble solution bottle"
    group: "Prototype 1"
  - src: "./media/three-quarter.jpg"
    caption: "Three-quarter view with the reservoir bottle"
    group: "Prototype 1"
  - src: "./media/comsol-t1.png"
    caption: "COMSOL, t = 0.475 s (inlet ≈ 4.75 m/s): the air jet pushes the film into a dome just before the mesh fails. Axisymmetric: the left edge is the axis, and the white square is the wand cross-section."
    group: "COMSOL: blowing on the soap film"
  - src: "./media/comsol-t0.png"
    caption: "COMSOL, t = 0: flat film spanning the 9.5 mm wand, with the inlet jet starting at the bottom left"
    group: "COMSOL: blowing on the soap film"
videos:
  - title: "Prototype 1 making bubbles"
    file: "media/videos/bubbles-side.mp4"
    poster: "./media/videos/bubbles-side.jpg"
    youtube: ""
    description: "Bench test on a battery: the pump feeds solution to the wand while the fan blows the bubbles off."
  - title: "Bench test, second angle"
    file: "media/videos/bubbles-fan.mp4"
    poster: "./media/videos/bubbles-fan.jpg"
    youtube: ""
    description: ""
  - title: "Bench test, wide shot"
    file: "media/videos/bubbles-front.mp4"
    poster: "./media/videos/bubbles-front.jpg"
    youtube: ""
    description: ""
documents: []
links: []
source: ""
guessed: ["summary", "writeup", "tools"]  # fields Claude drafted — remove once confirmed
---
For our senior design project, my team is building a bubble machine for **Dr. Zigs**, a sustainable bubble company. Its founder, Paola Dyboski Bryant, wants pedal-powered bubbles that work while you ride. Existing bubble bikes are stationary show pieces, and handheld bubble machines can't mount to a bike. The hard part is motion: riding shakes the reservoir, and sloshing solution spills out of an open dip tray and foams up, which stops bubble production.

## Requirements

We turned the client's goals into ranked user needs: efficiency, safety, accessibility, durability, sustainability and adaptability. From those we set measurable targets:

| Requirement | Target | Threshold |
|---|---|---|
| Bubble rate | 0.5–1 bubbles/s | 3 bubbles/s |
| Average bubble size | 2 in | 0.5 in |
| Runtime without refill | 60 min | 30 min |
| Assembly time (new user) | 5 min | 15 min |
| Works in wind up to | 20 mph | 10 mph |
| Weight | 2 lb | 8 lb |
| Clamps bike tubes up to | 2.5 in | 0.75 in |

Because riders will include young children, we're designing with the ASTM F963 and ISO 8124 toy-safety standards in mind. That means enclosing moving parts, avoiding finger-sized gaps, and keeping motor stall torque low enough that a caught finger is safe.

## Prototype 1

The key design choice is to **never dip the wand**. The solution stays in a closed bottle, and a peristaltic pump draws it from the bottom and drips it onto the wand. A peristaltic pump keeps the fluid sealed inside its tube, can run at very slow flow rates and primes itself, and unlike pumps that cavitate, it doesn't foam the solution.

- A motor turns the bubble-wand "flower" through a 4:1 gear reduction, so every wand passes under the drip.
- A second motor drives a fan that blows the film off each wand. Vents let air into the enclosure.
- The reservoir is a reused Dr. Zigs bottle, kept tall and thin to limit sloshing.
- The laser-cut wood enclosure separates the electronics from the solution. For this first prototype it runs on a 5 V battery, so we could test bubble generation with a steady power source before adding pedal power.

**Results:** the prototype produced about 50 bubbles/s (estimated from slow-motion video) at 1.5–2 cm each. It weighs 750 g and measures 153 × 70 × 145 mm. It far exceeds the rate target, but the bubbles are smaller than the 2 in target.

## COMSOL: how much air does it take to blow a bubble?

Prototype 1's bubbles came out smaller than our target, and wand size and fan airflow are the main levers. To size the fan and nozzle, I'm building a COMSOL model of an air jet blowing on a soap film. The goal is the **threshold air speed**: below it the film settles into a stable dome, and above it the dome keeps growing, which is when a bubble starts to form.

- **Model.** It's a 2D axisymmetric Laminar Two-Phase Flow, Moving Mesh study. I treat the soap film as a zero-thickness interface between two air domains, with tension 2γ for its two surfaces. I validate against Hamlett et al. (*Blowing big bubbles*): a 9.5 mm wand radius, γ = 25 mN/m for their dish-soap solution, and a jet matched to the wand.
- **Study.** The inlet speed ramps from 0 to 10 m/s over 1 s, slowly compared with the film's millisecond response, so the film stays near equilibrium until it passes the threshold. The knee in the film-center position vs. inlet speed curve marks the threshold.
- **Status.** The run reaches t ≈ 0.48 s (about 4.8 m/s) before the mesh fails. For comparison, the hand estimate ½ρU² ≈ 4γ/R<sub>w</sub> gives about 4.2 m/s, and Hamlett measured about 7 m/s for this wand. Reading off the threshold is next.

Getting the model to run took several fixes, each with a physical reason:

1. **A stationary study can't move the film.** With zero mesh velocity, the interface condition reduces to "no flow through the film," so the solver converges to a flat, rigid film. It needs a time-dependent ramp.
2. **Laminar flow diverged above about 0.45 m/s.** At the real Reynolds number (about 10⁴) the jet is turbulent. A constant eddy viscosity of 100× air's viscosity keeps the flow solvable. That is acceptable here because the film responds to dynamic pressure (ρU²), which barely depends on viscosity.
3. **Mesh nodes on the axis must be held to r = 0** but stay free to slide along z. Otherwise they cross the axis and the axisymmetric equations break down.
4. **The film has to be pinned to the wand.** COMSOL's two-phase interface lets contact points slide along walls by default, which suits droplets. An unpinned film is pushed downstream like a piston and inverts the mesh.

The model stops at the threshold. It doesn't cover detachment, so it can't predict bubble size; for that, Hamlett and Salkin's experiments put bubble diameter at about 2× the wand diameter. Next, I'll sweep wand radius and jet width to get a minimum-airflow curve for each candidate wand, then check it on a test rig with an anemometer and a camera.

## Next steps

Next we'll power the machine from the bike itself, design the mount and casing for real riding, and test against the remaining requirements. This page will grow as the project does.
