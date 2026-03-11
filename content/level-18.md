---
level: 18
title: "ODE Approximation Method"
notes: 4
prerequisites: [17]
---

# Level 18: ODE Approximation Method

## Reading

In this level we give a general statement that a (well-behaved) stochastic process will follow the solution of an associated ordinary differential equation. The process runs in discrete time, but the differential equation describes evolution in continuous time.

This is **not** a "stochastic differential equation" or "stochastic difference equation." We are looking at large deviations: we will try to show that "most of the probability mass" behaves deterministically when viewed from far away.

### The ODE setup

Consider a vector $\mathbf{x}$ in $\mathbb{R}^d$ which starts at some $\mathbf{x}(0)$ and evolves over time $t \geq 0$ according to

$$\frac{\mathrm{d}\mathbf{x}}{\mathrm{d}t} = f(t, \mathbf{x}),$$

where $f$ is a function from $\mathbb{R}^{d+1} \to \mathbb{R}^d$. A standard condition is that $f$ should be **$L$-Lipschitz-continuous** on some $\mathcal{D} \subseteq \mathbb{R}^{d+1}$, i.e.

$$\|f(t, \mathbf{x}) - f(t', \mathbf{x}')\|_\infty \leq L \|t - t', \mathbf{x} - \mathbf{x}'\|_\infty$$

where $\|t, \mathbf{x}\|_\infty = \max(|t|, \max_{1 \leq i \leq d} |\mathbf{x}_i|)$. Under these conditions, there exists a unique solution to the differential equation (for as long as the solution remains in $\mathcal{D}$).

### Grönwall's inequality

A key tool for controlling how ODE trajectories separate.

**Theorem 16 (Grönwall's inequality).** Suppose $0 \leq y(t) \leq C + L \int_{s=0}^{t} y(s) \, \mathrm{d}s$ holds for $0 \leq t \leq T$. Then for each $t \in [0, T]$ we have $y(t) \leq Ce^{Lt}$.

*Proof.* Consider $m(t) = e^{-Lt} \int_{s=0}^t y(s) \, \mathrm{d}s$. Its derivative is

$$m'(t) = \bigl(y(t) - L \int_{s=0}^t y(s) \, \mathrm{d}s\bigr) e^{-Lt} \leq C e^{-Lt}$$

and integrating: $m(t) \leq \frac{C}{L}(1 - e^{-Lt})$. So $\int_0^t y(s)\,\mathrm{d}s \leq \frac{C}{L}(e^{Lt} - 1)$, and then $y(t) \leq C + C(e^{Lt} - 1) = Ce^{Lt}$. $\square$

This says: if two ODE trajectories start at distance $C$, they separate at most exponentially fast (rate $L$). If $C$ is small and $L$ is reasonable, $Ce^{Lt}$ stays small for a while.

### Connecting processes to ODEs

Given $N \in \mathbb{N}$ and a process $(\mathbf{Z}_n)_{n \in \mathbb{N}}$ on $(\Omega, \mathcal{F}, \mathbb{P})$ taking values in $\mathbb{R}^d$, adapted to filtration $(\mathcal{F}_n)_{n \in \mathbb{N}}$, suppose that for each $n \in \mathbb{N}$:

$$\mathbb{E}(\mathbf{Z}_n - \mathbf{Z}_{n-1} | \mathcal{F}_{n-1}) = f\!\left(\frac{n-1}{N}, \frac{1}{N}\mathbf{Z}_{n-1}\right),$$

where we define the conditional expectation of a random variable taking values in $\mathbb{R}^d$ to be the vector of conditional expectations of the $d$ components.

Then an **ODE associated to the process** is $\frac{\mathrm{d}\mathbf{x}}{\mathrm{d}t} = f(t, \mathbf{x})$, with initial condition $N\mathbf{x}(0) = \mathbf{Z}_0$. We should think of $N$ as being a large number, so that $\frac{1}{N}\mathbf{Z}_n$ lives on a "rescaled" version of the state space.

### Example 17: Infection model

In a population of size $N$, at time 0 there are $Z_0$ infected people. At each time $t \geq 1$, we sample independently (with replacement) people $a, b, c$ in the population. If $a$ is infected at time $t - 1$ and $b$ is not, with probability $\lambda$ person $b$ will be infected at time $t$. Independently, if $c$ is infected at time $t - 1$ then with probability $\rho$ they recover.

The conditional expectation of the increment is:

$$\mathbb{E}(Z_n | Z_{n-1} = z) = \frac{N - z}{N} \cdot \frac{z}{N} \cdot \lambda - \frac{z}{N} \cdot \rho = \lambda \frac{Z_{n-1}}{N}\left(1 - \frac{Z_{n-1}}{N}\right) - \rho \frac{Z_{n-1}}{N}.$$

So the associated ODE is $\frac{\mathrm{d}x}{\mathrm{d}t} = \lambda x(1 - x) - \rho x$, a Bernoulli ODE with explicit solution

$$x(t) = \frac{\lambda - \rho}{\lambda + \bigl(\frac{\lambda - \rho}{x(0)} - \lambda\bigr) e^{(\rho - \lambda)t}}$$

when $\lambda \neq \rho$. The behaviour depends on $\lambda$ vs $\rho$: if $\rho > \lambda$ the infection dies out ($x(t) \to 0$); if $\rho < \lambda$ it converges to $\frac{\lambda - \rho}{\lambda}$ (endemic equilibrium).

### The ODE approximation theorem

**Theorem 18.** Let $\mathcal{D} \subseteq \mathbb{R}^{d+1}$, and let $f(t, \mathbf{x})$ be $L$-Lipschitz continuous on $\mathcal{D}$ and take values in $\mathbb{R}^d$; suppose that $R \geq 1$ is such that $\|f(t, \mathbf{x})\|_\infty \leq R$ on $\mathcal{D}$. Given a filtered probability space $(\Omega, \mathcal{F}, \mathbb{P})$, let $(\mathbf{Z}_n)_{n \geq 0}$ be a $\mathbb{R}^d$-valued process adapted to the filtration $(\mathcal{F}_n)_{n \geq 0}$. Suppose

$$\mathbb{E}(\mathbf{Z}_n - \mathbf{Z}_{n-1} | \mathcal{F}_{n-1}) = f\!\left(\frac{n-1}{N}, \frac{\mathbf{Z}_{n-1}}{N}\right)$$

holds whenever $\frac{1}{N}\mathbf{Z}_{n-1} \in \mathcal{D}$, and suppose $B > 0$ is such that $\|\mathbf{Z}_n - \mathbf{Z}_{n-1}\|_\infty \leq B$ holds surely.

Now let $\mathbf{x}(t)$ solve the ODE $\mathbf{x}'(t) = f(t, \mathbf{x}(t))$ with initial condition $N\mathbf{x}(0) = \mathbf{Z}_0$. Let $\tau \geq 0$ be such that for each $0 \leq t \leq \tau$, the ball of radius $2RN^{-1/4}e^{8Lt}$ around $\mathbf{x}(t)$ is within $\mathcal{D}$.

Then with probability at least $1 - 2d\tau N \exp\!\left(-\frac{LN^{1/2}eR^2}{2B^2}\right)$, for any $0 \leq n \leq \tau N$, we have

$$\|\mathbf{Z}_n - N\mathbf{x}(n/N)\|_\infty \leq 2N^{3/4} R e^{8Ln/N}.$$

### How to read this theorem

Think of $N$ as a very large number. The constants $d, L, R, B$ will usually be small (not depending on $N$). The key features:

1. **The error bound** $2N^{3/4}Re^{8Ln/N}$ starts at $N^{3/4}$ and grows exponentially. On the $y$-axis (which goes from 0 to $N$), this error only becomes noticeable once $n \approx N \log N$.

2. **The probability bound** tends to 1 exponentially fast in $N$ (the exponent has $N^{1/2}$).

3. **The time horizon** $\tau$ can be taken to be on the order of $\log N / L$ for "unstable" ODEs, or much longer for "stable" ODEs.

Three regimes of ODE behavior:
- **Unstable** ($f(t,x) = x$ type): trajectories separate as fast as Grönwall allows. Track for $\sim N \log N$ steps.
- **Neutral** ($f(t,x) = 0$ type, e.g., simple random walk): probability mass spreads out with $\sqrt{n}$. Can track for polynomial time with Exercise 10 improvements.
- **Stable** ($f(t,x) = Q - x$ type): trajectories converge exponentially. Using the "catch and throw" technique of Exercise 12, can track for exponentially long time.

## Key Results

### theorem: Grönwall's inequality
**Number:** Theorem 16
**Plain English:** If a non-negative function satisfies $y(t) \leq C + L\int_0^t y(s)\,\mathrm{d}s$, then $y(t) \leq Ce^{Lt}$. This quantifies the maximum rate at which ODE solutions can separate.
**Formal:** $0 \leq y(t) \leq C + L\int_0^t y(s)\,\mathrm{d}s$ for $0 \leq t \leq T$ implies $y(t) \leq Ce^{Lt}$.
**Proof sketch:** Define $m(t) = e^{-Lt}\int_0^t y(s)\,\mathrm{d}s$, show $m'(t) \leq Ce^{-Lt}$, integrate.
**Key technique:** Integrating factor
**Depends on:** Calculus
**Used by:** ODE stability, Theorem 18
**Load-bearing:** yes

### theorem: ODE approximation
**Number:** Theorem 18
**Plain English:** A stochastic process whose conditional expected increment matches an ODE drift function will, with high probability, track the ODE solution up to an error of $O(N^{3/4})$ for time $O(\tau N)$.
**Formal:** See theorem statement above. Error bound: $\|\mathbf{Z}_n - N\mathbf{x}(n/N)\|_\infty \leq 2N^{3/4}Re^{8Ln/N}$.
**Proof sketch:**
1. Define error bound $\alpha_y = 2N^{3/4}Re^{8Ly/N}$ growing exponentially
2. Define events $E_i$ (no previous error exceeded $\alpha_{i-1}$, but error exceeds $\alpha_i$)
3. Show the approximation error (Lipschitz) is $\leq \frac{2L}{N}\alpha_{i-1}$ (eq. 3)
4. Show ODE discretization error is $\leq LR/N$ (eq. 4)
5. Extract a martingale from each coordinate of the stochastic error
6. Apply Azuma (Theorem 14) to bound $\mathbb{P}(E_n)$ with a union bound over $n, j$
**Key technique:** Martingale decomposition + Azuma + Grönwall-style growing error bound
**Depends on:** Theorem 14, Theorem 16, CE properties
**Used by:** Load balancing (Level 19), infection model analysis
**Load-bearing:** yes

## Exercises

### exercise: Infection model with $\rho > \lambda$
**Number:** Exercise 9
**Difficulty:** standard
**Tags:** ODE-approximation, infection-model, domain-extension

**Question:**
Use Theorem 18 to analyse what happens in Example 17 if $\rho > \lambda$. In order to obtain $\tau$ similar to the $\lambda < \rho$ case, you will need to change $\mathcal{D}$: can you do so without changing $L$ and $R$?

**Hint 1:** When $\rho > \lambda$, the ODE solution decays to 0
The solution converges to 0 rather than diverging. Neither the process nor the ODE solution can leave $\mathcal{D}$ if $\mathcal{D}$ is chosen appropriately.

**Hint 2:** Extend $f$ outside $[0,1]$
Let $f$ be defined as it is on $\mathbb{R} \times [0,1]$, but set $f(t,x) = f(t,0)$ for all $x < 0$ and $f(t,x) = f(t,1)$ for all $x > 1$. This avoids needing to change $L$ and $R$, and the ODE solution (which stays in $[0,1]$) is unchanged.

**Solution:**
There are several ways. The simplest is to observe that neither the process nor the ODE solution can leave $\mathcal{D}$ (in fact all the points we want to claim are in $\mathcal{D}$ are really in there without changing anything). But this requires us to look into the proof of Theorem 18 and check it works (this is not something that works for all processes!).

We could also make $\mathcal{D}$ a bit larger, for example $\mathbb{R} \times [-0.1, 1.1]$. If we *only* do this, then we will have to change $L$ and $R$, though to the worse. But we can play a trick: let $f$ be defined as it is on $\mathbb{R} \times [0,1]$, but set $f(t,x) = f(t,0)$ for all $x < 0$, and $f(t,x) = f(t,1)$ for all $x > 1$. Since neither the process nor the ODE solution leaves the original domain, this change to $f$ doesn't change the ODE trajectories or the process. This gets the same result as the first route, but we don't have to look into the proof of Theorem 18: we're simply applying the statement.

### exercise: Modified error exponent
**Number:** Exercise 10
**Difficulty:** challenge
**Tags:** ODE-approximation, error-bound, exponent-modification

**Question:**
Prove that we can modify Theorem 18 as follows: Fix any $\frac{1}{2} < \nu < 1$. We choose $\tau$ such that the ball of radius $2RN^{\nu - 1}e^{8Lt}$ around $\mathbf{x}(t)$ is in $\mathcal{D}$ whenever $0 \leq t \leq \tau$, and we obtain a probability bound $1 - 2d\tau N \exp\!\left(-\frac{LN^{2\nu-1}eR^2}{2B^2}\right)$ for the event that for all $0 \leq n \leq \tau N$ we have

$$\|\mathbf{Z}_n - N\mathbf{x}(n/N)\|_\infty \leq 2N^{\nu} R e^{8Ln/N}.$$

*(Hint: You should find that this does not require you to change the proof much: it is enough to explain where changes are needed, and what calculations need to change as a result.)*

**Hint 1:** Replace $\frac{3}{4}$ with $\nu$ everywhere
Redefine $\alpha_y = 2N^{\nu}Re^{8Ly/N}$. That is, we replaced the exponent $\frac{3}{4}$ with $\nu$ throughout the entire statement.

**Hint 2:** Check the two critical inequalities
The two places where the proof interacts with the changed exponent are: (1) checking that the ball around the ODE solution stays in $\mathcal{D}$ — this uses $\frac{R}{N} \leq N^{\nu-1}$ which holds for $\nu > \frac{1}{2}$ and large $N$; (2) checking $\frac{nLR}{N} \leq \frac{1}{2}\alpha_n$ — we need $nLR \leq N^{\nu}Re^{8Ln/N}$, which is $n \leq N^{1+\nu}e^{8Ln/N}$ (true for $\nu \geq 0$).

**Solution:**
We modify as follows. First, we redefine $\alpha_y = 2N^{\nu}Re^{8Ly/N}$; that is, we replace the exponent $\frac{3}{4}$ with $\nu$. In fact, that's what we've done for the entire statement: we replaced $\frac{3}{4}$ with $\nu$ in exponents.

Our two claims that give (3) and (4) don't need any changing: the only two places where the proof as written interacts with the changes we made at all is that we need to check certain points are in $\mathcal{D}$. In the proof of (3), the justification is that $\alpha_{i-1}$ of the ODE solution: but since we also changed in a matching way, this remains true. In the proof of (4) we similarly need that our ball has radius at least $\frac{R}{N}$; this would be true even if we were allowed to take $\nu = 0$, and it certainly is for $\nu > \frac{1}{2}$.

For (5), while $\alpha_n$ appears all over the place in the derivation of this inequality, we don't actually ever substitute in its value, so the inequality will still hold for the changed definition.

The first line still just follows from our assumption on the martingale sum. For the second line, we need to check the calculation upper bounding the sum by an integral and doing the integral still works. Which it does: the $N^{3/4}$ which has been replaced by $N^\nu$ is just a constant factor that appears multiplying all four terms in the calculation, so nothing really changed. The final line needs us to check $\frac{nLR}{N} \leq \frac{1}{2}\alpha_n$: we need $nLR \leq N^{\nu}Re^{8Ln/N}$, which is $n \leq N^{1+\nu}e^{8y/N}$. This is true for $\nu \geq 0$.

This leaves us with the three lines of estimates and the final probability bound to check. The first line still holds. For the second, the integral still works (the $N^{3/2}$ becomes $N^{2\nu}$). The final line needs $\frac{nLR}{N} \leq N^{\nu}Re^{8Ln/N}$, which works as above. The final probability bound substitutes $\alpha_n^2$ which now has $N^{2\nu}$ instead of $N^{3/2}$, giving $N^{2\nu-1}$ in the exponent.

### exercise: $\delta$-associated ODE
**Number:** Exercise 11
**Difficulty:** challenge
**Tags:** ODE-approximation, rounding-errors, delta-associated

**Question:**
We can modify Theorem 18 slightly as follows: there is $\delta > 0$ (which you should determine, and which will depend on $N$) such that we insist only on

$$\left\|\mathbb{E}(\mathbf{Z}_n - \mathbf{Z}_{n-1} | \mathcal{F}_{n-1}) - f\!\left(\frac{n-1}{N}, \frac{\mathbf{Z}_{n-1}}{N}\right)\right\|_\infty < \delta$$

holding whenever $\frac{1}{N}\mathbf{Z}_{n-1} \in \mathcal{D}$. Furthermore we do not insist on $\mathbf{x}(0) = \frac{1}{N}\mathbf{Z}_0$, but only $\|\mathbf{x}(0) - \frac{1}{N}\mathbf{Z}_0\|_\infty < \delta$. We say that the ODE is **$\delta$-associated** to the process. Prove that we still obtain the same conclusion in Theorem 18 if we only ask for a $\delta$-associated ODE, provided $\delta > 0$ is sufficiently small.

**Hint 1:** Identify the three places in the proof that change
(1) The initial condition: $|\mathbf{Z}_0 - N\mathbf{x}(0)| \leq \alpha_0$ needs $\delta N \leq \alpha_0$. (2) The derivation of equation (3): the extra $\delta$ error gets absorbed by slack. (3) The approximation to the third line of estimates.

**Hint 2:** Choose $\delta = \min(1, L) R N^{-1/4}$
This ensures $\delta N \leq N^{3/4}R$ (matching $\alpha_0$), and the extra $\delta$ in the conditional expectation gets absorbed by the $\frac{2L}{N}\alpha_i$ term with room to spare.

**Solution:**
There are three places where things change.

We need to check that $|\mathbf{Z}_0 - N\mathbf{x}(0)| \leq \alpha_0$. This means we need $\delta N \leq \alpha_0 = 2N^{3/4}R$, i.e. $\delta \leq 2RN^{-1/4}$.

The derivation of (3) needs to change, because we replace the equality $\mathbb{E}(\mathbf{Z}_i - \mathbf{Z}_{i-1}|\mathcal{F}_{i-1}) = f(\frac{i-1}{N}, \frac{\mathbf{Z}_{i-1}}{N})$ by $|\mathbb{E}(\mathbf{Z}_i - \mathbf{Z}_{i-1}|\mathcal{F}_{i-1}) - f(\frac{i-1}{N}, \frac{\mathbf{Z}_{i-1}}{N})| < \delta$. But we can use the "slack" built in to (3): the factor 2 wasn't really necessary, and we get an error bounded by $\frac{L}{N}\alpha_{i-1} + \delta \leq \frac{2L}{N}\alpha_i$ here; we need $\delta < \frac{L}{N}\alpha_0$. For this to be a true statement, we need $\delta \leq \frac{L}{N} \cdot 2N^{3/4}R = 2LRN^{-1/4}$.

Finally, the last line of the approximation: $\|\mathbf{Z}_n - \mathbf{Z}_0 - (N\mathbf{x}(n/N) - N\mathbf{x}(0))\|_\infty = \|\mathbf{Z}_n - N\mathbf{x}(n/N)\|_\infty$ is no longer valid, because $\mathbf{Z}_0 \neq N\mathbf{x}(0)$. There will be a further error $\delta N$. We need $\frac{nLR}{N} + \delta N \leq N^{3/4}Re^{8Ln/N}$ to hold for all $n$. The same calculus argument as in the original proof works, provided $\delta N \leq N^{3/4}R$, i.e. $\delta \leq RN^{-1/4}$.

Putting these three requirements on $\delta$ together, we end up with $\delta = \min(1, L)RN^{-1/4}$. $\square$
