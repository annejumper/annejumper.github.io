---
title: "Shock Tube: 1D Compressible Navier–Stokes Solver"
summary: "A MacCormack finite-difference solver I wrote in MATLAB for the shock tube problem, comparing 2nd- and 4th-order schemes, grid resolution, and the viscous solution against the inviscid analytical one."
categories: ["Simulation"]
tools: ["MATLAB", "MacCormack scheme", "Gottlieb\u2013Turkel 4th-order stencils", "Artificial viscosity"]
course: "Computational Fluid Dynamics (ME 193)"
date: "Spring 2026"
sortDate: "2026-04"
team: "Individual"
role: ""
featured: 0
hero: "./hero.png"
heroAlt: "Velocity, pressure, temperature and density along the shock tube at t = 0.006 s"
gallery:
  - src: "./media/t0001.png"
    caption: "t = 0.001 s"
    group: "Time evolution (viscous, 4th order, Nx = 1001)"
  - src: "./media/t0002.png"
    caption: "t = 0.002 s"
    group: "Time evolution (viscous, 4th order, Nx = 1001)"
  - src: "./media/t0004.png"
    caption: "t = 0.004 s"
    group: "Time evolution (viscous, 4th order, Nx = 1001)"
  - src: "./media/t0006.png"
    caption: "t = 0.006 s: shock and contact surface moving right, expansion fan widening left"
    group: "Time evolution (viscous, 4th order, Nx = 1001)"
  - src: "./media/inviscid-analytical.png"
    caption: "Inviscid analytical solution at t = 0.004 s"
    group: "Analytical vs. viscous numerical"
  - src: "./media/viscous-numerical.png"
    caption: "Viscous 4th-order numerical solution at t = 0.004 s: viscosity and conduction smooth the jumps"
    group: "Analytical vs. viscous numerical"
  - src: "./media/grid-21.png"
    caption: "Nx = 21: shock and contact discontinuity badly smeared"
    group: "Grid convergence (2nd order)"
  - src: "./media/grid-101.png"
    caption: "Nx = 101"
    group: "Grid convergence (2nd order)"
  - src: "./media/grid-1001.png"
    caption: "Nx = 1001: sharp jumps and accurate wave speeds"
    group: "Grid convergence (2nd order)"
videos: []
documents:
  - title: "Project Report"
    file: "docs/project-report.pdf"
    description: "Full report with stencil derivations, results and the complete MATLAB code"
links: []
source: ""
guessed: ["summary", "writeup"]  # fields Claude drafted — remove once confirmed
---
The shock tube (Riemann) problem is a standard test of how well a numerical scheme handles sharp discontinuities. A tube is split by a diaphragm into a high-pressure driver section and a low-pressure driven section; when the diaphragm ruptures, a shock wave travels into the low-pressure gas, an expansion fan travels back into the high-pressure gas, and a contact discontinuity forms between them. I wrote a MATLAB solver for the 1D unsteady compressible Navier–Stokes equations to model it.

## How the solver works

- **Physics.** The conservation form ∂U/∂t + ∂F/∂x = J tracks mass, momentum and energy, so the shock's position and speed come out right. Viscous stress and heat conduction enter through the source vector J, with temperature-dependent viscosity from Sutherland's law and thermal conductivity from the Prandtl number (Pr = 0.707).
- **MacCormack predictor–corrector**, second-order in time. I derived the stencils from Taylor-series expansions: the standard second-order one-sided differences and the fourth-order Gottlieb–Turkel stencils (weights −7, 8, −1).
- **Artificial viscosity.** A pressure-weighted damping term suppresses Gibbs oscillations at the shock while leaving smooth regions accurate. I tuned its coefficient within the assignment range of 0.01–0.3.
- **Setup.** A 10 m tube with the diaphragm at 5 m (P₄ = 10⁵ Pa, ρ₄ = 1.0 kg/m³; P₁ = 10⁴ Pa, ρ₁ = 0.125 kg/m³), with zero-gradient wall conditions implemented as second-order one-sided differences. I smoothed the initial jump over a few grid points so the first time step stays stable.

## Findings

- **Viscous vs. inviscid.** The viscous solution smooths the analytical step changes across several grid points. Heat conduction also produces a local density rise at the contact surface, keeping pressure in equilibrium as the temperature profile spreads.
- **Grid convergence.** At Nx = 21 the shock and contact surface are badly smeared; by Nx = 1001 the jumps are sharp and the wave speeds are accurate. This separates the physical smoothing from viscosity from the numerical smoothing that only a finer grid removes.
- **2nd vs. 4th order: nearly identical.** Near strong shocks a high-order scheme has to fall back to lower-order behavior to stay stable, and the physical plus artificial dissipation spans several grid points, overwhelming the extra spatial accuracy. At Nx = 1001 the fourth-order scheme still gives cleaner corners, where the second-order scheme overshoots slightly at each step.
