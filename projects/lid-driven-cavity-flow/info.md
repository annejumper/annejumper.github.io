---
title: "Lid-Driven Cavity Flow (COMSOL)"
summary: "Steady 2D incompressible flow in a lid-driven cavity at Re = 1 and Re = 500: how the flow moves from viscous- to inertia-dominated, and the corner vortex that appears."
categories: ["Simulation"]
tools: ["COMSOL Multiphysics (Laminar Flow)", "Mapped mesh + boundary-layer refinement"]
course: "Computational Fluid Dynamics (ME 193)"
date: "Spring 2026"
sortDate: "2026-04"
team: "Individual"
role: ""
featured: 3
hero: "./hero.png"
heroAlt: "Velocity magnitude in the lid-driven cavity at Re = 1 (left) and Re = 500 (right)"
gallery:
  - src: "./media/streamlines-re1.png"
    caption: "Re = 1: a single, nearly symmetric primary vortex"
    group: "Re = 1 (viscous-dominated)"
  - src: "./media/vorticity-re1.png"
    caption: "Re = 1 vorticity: strongest at the lid, decaying smoothly"
    group: "Re = 1 (viscous-dominated)"
  - src: "./media/centerline-re1.png"
    caption: "Re = 1 centerline velocity profiles (x = 0.5)"
    group: "Re = 1 (viscous-dominated)"
  - src: "./media/streamlines-re500.png"
    caption: "Re = 500: the vortex shifts and a secondary vortex forms in the lower-right corner"
    group: "Re = 500 (inertia-dominated)"
  - src: "./media/vorticity-re500.png"
    caption: "Re = 500 vorticity: concentrated in thin layers along the lid and right wall (peak ≈ 489 1/s vs. 67.8 at Re = 1)"
    group: "Re = 500 (inertia-dominated)"
  - src: "./media/centerline-re500.png"
    caption: "Re = 500 centerline profiles: a steep gradient near the lid and stronger reverse flow (u ≈ −0.3)"
    group: "Re = 500 (inertia-dominated)"
  - src: "./media/mesh-re1.png"
    caption: "Uniform 50 × 50 mapped mesh for Re = 1"
    group: "Meshes"
  - src: "./media/mesh-re500.png"
    caption: "100 × 100 mapped mesh with 4-layer boundary-layer refinement for Re = 500"
    group: "Meshes"
videos: []
documents:
  - title: "Project Report"
    file: "docs/project-report.pdf"
    description: "Full report: setup, mesh, velocity, vorticity, streamlines and centerline profiles"
links: []
source: ""
guessed: ["summary", "writeup"]  # fields Claude drafted — remove once confirmed
---
The lid-driven cavity is a classic CFD benchmark: a square cavity whose top wall slides sideways while the other three walls stay still. With such simple geometry, its flow depends entirely on the Reynolds number, which makes it a clean way to study the shift from viscous- to inertia-dominated flow. I solved the steady, incompressible 2D Navier–Stokes equations in COMSOL for Re = 1 and Re = 500 and compared the velocity, vorticity, streamlines and centerline profiles.

## Setup

- **Nondimensional model in a dimensional solver.** COMSOL needs dimensional inputs, so I set ρ = 1 kg/m³, U = 1 m/s and L = 1 m, making the dynamic viscosity μ = 1/Re directly (1.0 Pa·s for Re = 1, 0.002 Pa·s for Re = 500).
- **Boundary conditions.** The lid moves at u = 1, and the other walls are no-slip. A pressure point constraint (p = 0) in one corner gives the enclosed cavity a pressure reference; without it the solver can't fix the absolute pressure level and fails to converge.
- **Meshing.** Re = 1 used a uniform 50 × 50 mapped quad mesh, since its gradients are gentle everywhere. Re = 500 used a 100 × 100 mesh plus four boundary-layer refinement layers on every wall, resolving the thin, steep near-wall layers without refining the whole domain.

## Results

- **Re = 1 (viscous-dominated).** High velocity stays right at the lid and the interior is nearly stagnant, because viscosity diffuses the lid's momentum before it reaches the interior. There's a single, nearly symmetric primary vortex sitting slightly toward the lid, and no secondary vortices.
- **Re = 500 (inertia-dominated).** Momentum is carried along the lid and down the right wall before it diffuses. The primary vortex shifts down toward the center and slightly in the direction of the lid, a **secondary vortex** forms in the lower-right corner, and vorticity concentrates in thin layers along the lid and right wall (peak ≈ 489 1/s vs. 67.8 1/s at Re = 1). The centerline profile shows stronger reverse flow near the bottom (u ≈ −0.3).
- Both cases agree qualitatively with the known low- and high-Re behavior, which supports the mesh strategy. The bottom-left corner vortex isn't resolved at Re = 500, but it appears when the simulation is rerun at Re ≈ 1500.
