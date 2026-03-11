---
level: 19
title: "Load Balancing"
notes: 5
prerequisites: [18]
---

# Level 19: Load Balancing

## Reading

We now apply the ODE approximation method from Level 18 to a practical problem: **load balancing** in server networks. The question is simple but important: if you have $N$ servers and customers arrive randomly, how should you assign each customer to a server to keep queue lengths short?

### The model

Suppose you run a collection of $N$ servers. At each time step, with probability $\lambda < 1$ a customer appears. They choose a server (somehow!) and add one job to its queue. Then, one server is chosen uniformly at random, and (if it has at least one job in its queue) one job is completed and removed.

This is a standard model for Internet services. A service provider buys sufficient servers — make $N$ large enough — so that on average serving customers is faster than customers arrive ($\lambda < 1$).

The two most obvious assignment strategies are:
1. Pick the server with the shortest queue (requires global knowledge — expensive!)
2. Pick a random server (no coordination needed)

### Example 1: Random assignment (1 choice)

**Example 1.** At each time $t \in \mathbb{N}$, sample uniformly with replacement a pair $(a, b)$ of servers; with probability $\lambda < 1$ add one to the queue of $a$; if this results in a queue of length $N + 1$ then set the queue length back to $N$. Then, if the queue of $b$ has positive length, subtract one from it.

Let $\mathbf{Z}_n \in \{0, \ldots, N\}^N$ count the number of servers at time $n$ whose queue has length at least $i$, for each $1 \leq i \leq N$.

The conditional expectations of the increments give the associated ODE system:

$$\frac{\mathrm{d}\mathbf{x}^{(1)}}{\mathrm{d}t} = \lambda + \mathbf{x}^{(2)}(t) - (1 + \lambda)\mathbf{x}^{(1)}(t)$$

$$\frac{\mathrm{d}\mathbf{x}^{(j)}}{\mathrm{d}t} = \lambda \mathbf{x}^{(j-1)}(t) + \mathbf{x}^{(j+1)}(t) - (1 + \lambda)\mathbf{x}^{(j)}(t) \quad (1 < j < N)$$

$$\frac{\mathrm{d}\mathbf{x}^{(N)}}{\mathrm{d}t} = \lambda \mathbf{x}^{(N-1)}(t) - (1 + \lambda)\mathbf{x}^{(N)}(t)$$

This ODE has a fixed point close to $(\lambda, \lambda^2, \lambda^3, \ldots)$ — coordinates decreasing exponentially in $j$. More precisely, the fixed point has $j$th coordinate at least $\left(\frac{\lambda}{1+\lambda}\right)^j$.

Applying Theorem 18 with $d = N$, $\mathcal{D} = \mathbb{R} \times [-2, 2]^N$, $B = 1$, $L = 4$, $R = 8$, and solving for $\tau$:

$$2RN^{-1/4}e^{8L\tau} = N^{-0.2} \implies \tau = \frac{1}{128}\log\!\left(\frac{1}{32}N^{0.05}\right) \sim \log N.$$

So with probability tending to 1, the process tracks the ODE for $\sim N \log N$ steps.

**What this means for queue lengths:** The worst $N^{0.8}$ servers have queue length roughly $j$ where $\lambda^j \approx N^{-0.2}$, giving $j \approx 0.2 \frac{\log N}{\log \lambda^{-1}}$. Queue lengths scale as $\log N$ — not great!

Also, only about $\lambda N$ servers are actually working at any time, which is wasteful.

### Example 2: Power of two choices

**Example 2.** Now each customer chooses **two** uniform random servers and joins the shorter queue (ties broken deterministically). Sample a triple $(a, b, c)$; the job goes to whichever of $a, b$ has the shorter queue. Then if $c$ has a job, complete it.

The conditional expectations now involve **squared** terms (because both servers must have queue $\geq j-1$ for the $j$-th component to increase):

$$\frac{\mathrm{d}\mathbf{x}^{(j)}}{\mathrm{d}t} = \lambda\!\left(\mathbf{x}^{(j-1)}(t)^2 - \mathbf{x}^{(j)}(t)^2\right) + \mathbf{x}^{(j+1)}(t) - \mathbf{x}^{(j)}(t)$$

The fixed point now has coordinates close to $\lambda^{2^j - 1}$ — **doubly exponential** decay! Solving the analogous equation:

$$\lambda^{2^j - 1} = N^{-0.2} \implies j \approx \frac{1}{\log 2}\log\!\left(1 + \frac{0.2 \log N}{\log \lambda^{-1}}\right) \approx \frac{\log\log N}{\log 2}.$$

Queue lengths scale as $\log \log N$ instead of $\log N$ — a **massive** improvement! The difference between $\log N$ and $\log \log N$ is enormous in practice.

### The $s$-choice generalization

With $s$ random servers (join the shortest queue), the fixed point has $j$th coordinate scaling as $\lambda^{(s^j - 1)/(s-1)}$, and queue lengths scale as $\frac{1}{\log s}\log\!\left(1 + (s-1)\frac{0.2 \log N}{\log \lambda^{-1}}\right)$.

For $s = 2$ and $s = 3$, we divide by $\log 2$ and $\log 3$ respectively — slightly better constants, but the fundamental scaling is always $\log \log N$. Going from 1 to 2 choices is transformative; going from 2 to 3 is incremental. This is the famous **"power of two choices"** phenomenon: 2 choices is good enough, and (where it's public knowledge!) this is what's used in practice.

### Limitations of the analysis

The ODE method's errors grow exponentially, so our tracking time is limited to $\sim N\log N$ steps. For the infection model this was fine (we tracked until equilibrium). For load balancing, equilibrium is reached very quickly in practice, but our error bounds eventually dominate. More refined methods (Freedman's inequality instead of Azuma, witness trees) can extend the analysis but require substantially more work.

## Key Results

### theorem: Random assignment queue length
**Number:** Example 1 (application of Theorem 18)
**Plain English:** With random server assignment, the worst queues have length $\Theta(\log N)$, and only fraction $\lambda$ of servers are busy.
**Formal:** The ODE fixed point has $j$th coordinate $\approx \left(\frac{\lambda}{1+\lambda}\right)^j$. Queue length for worst $N^{0.8}$ servers is $\approx 0.2\frac{\log N}{\log \lambda^{-1}}$.
**Key technique:** ODE approximation (Theorem 18)
**Depends on:** Theorem 18 (Level 18)
**Used by:** Comparison with 2-choice
**Load-bearing:** no

### theorem: Power of two choices
**Number:** Example 2 (application of Theorem 18)
**Plain English:** If each customer samples two random servers and joins the shorter queue, queue lengths drop from $\Theta(\log N)$ to $\Theta(\log \log N)$ — a dramatic improvement from one extra query.
**Formal:** The ODE fixed point has $j$th coordinate $\approx \lambda^{2^j - 1}$. Queue length for worst $N^{0.8}$ servers is $\approx \frac{1}{\log 2}\log(1 + \frac{0.2\log N}{\log \lambda^{-1}})$.
**Key technique:** ODE approximation with squared terms in drift
**Depends on:** Theorem 18 (Level 18)
**Used by:** General load balancing theory
**Load-bearing:** yes

## Exercises

### exercise: Complete the ODE application for 2-choice
**Number:** Exercise 1
**Difficulty:** standard
**Tags:** ODE-approximation, load-balancing, two-choices, Lipschitz

**Question:**
Complete the application of the Differential Equations Theorem (Theorem 18) to the power-of-two-choices model (Example 2) by finding a suitable $\mathcal{D}$, and values for $L$, $R$, $B$, and $\tau$.

Your choice of $\tau$ should ensure that $\|\mathbf{Z}_n - N\mathbf{x}(n/N)\|_\infty \leq N^{0.8}$ holds for all $0 \leq n \leq \tau N$.

**Hint 1:** Choose $B$ and $\mathcal{D}$
$B = 1$ (at most one queue changes by 1 per step). For $\mathcal{D}$, take $\mathcal{D} = \mathbb{R} \times [-2, 2]^N$ as in Example 1.

**Hint 2:** Compute $L$ and $R$
Each ODE component has at most four terms, with coefficients at most 1. The squaring means derivatives involve terms up to $2 \cdot 2^2 = 8$ in magnitude. Take $L = R = 4 \cdot 2^2 = 16$, then solve for $\tau$ from $2N^{3/4} \cdot 16 \cdot e^{8 \cdot 16 \cdot \tau} = N^{0.8}$.

**Solution:**
$B = 1$ as in the first example. For $\mathcal{D}$, we take $\mathcal{D} = \mathbb{R} \times [-2, 2]^N$. Each component of the ODE has at most four terms, with coefficients at most 1. We definitely do want to avoid the terms themselves being very large, but for this we can afford to look at the same $\mathcal{D}$ as for the first example; we quickly compute $L = R = 4 \cdot 2^2 = 16$. We could have been more careful and optimised this to get a smaller constant, but 16 given we obviously can't do better than say 1.

So what remains is to check on $\tau$. Starting from $\mathbf{x}(0) = \mathbf{0}$, we argued that the $j$th coordinate of the ODE trajectory will remain between 0 and $\lambda^{2^j - 1} \leq 1$ for all time, so we don't have to worry about the ball leaving $\mathcal{D}$ until the ball radius reaches 1. Since we are required to stop when the ball radius is $N^{-0.2}$ (corresponding to the process being off from the scaled ODE solution by $N^{0.8}$), we have to solve

$$2N^{3/4} \cdot 16 \cdot e^{8 \cdot 16\tau} = N^{0.8}$$

which is easy enough: rearrange and take logs to get

$$\tau = \frac{1}{128}\log\!\left(\frac{1}{32}N^{0.05}\right).$$

### exercise: $s$-choice generalization
**Number:** Exercise 2
**Difficulty:** challenge
**Tags:** load-balancing, s-choices, ODE, fixed-point

**Question:**
Can Google do even better if customers are allowed to query 3 random servers, or generally $s$ random servers? Write down the corresponding process, set up the associated ODE, and try to find out. You may find it useful to simulate the process and/or to use a computer to help find the fixed point of the ODE.

**Hint 1:** Write conditional expectations for 3 choices
With 3 choices, the chance the shortest queue has length exactly $j - 1$ involves cubed terms minus squared terms (inclusion-exclusion on which server has the shortest queue).

**Hint 2:** Look for a pattern in the exponents
For 2 choices: exponent doubles each level ($2^j - 1$ pattern). For 3 choices: exponent triples each level ($\frac{3^j - 1}{2}$ pattern). For $s$ choices: exponent multiplies by $s$ each level ($\frac{s^j - 1}{s - 1}$ pattern).

**Solution:**
For 3 choices, we choose 3 uniform random servers $a, b, c$ (with replacement) and the job goes to the one with the shortest queue (ties broken deterministically). The conditional expectation for queue increments at level $j$ involves the probability that the minimum queue length among $\{a, b, c\}$ is exactly $j - 1$.

For $j = 1$:
$$\mathbb{E}(\mathbf{Z}_n^{(1)} - \mathbf{Z}_{n-1}^{(1)} | \mathcal{F}_{n-1}) = \lambda\frac{N - \mathbf{Z}_{n-1}^{(1)}}{N}\left(\frac{N}{N}\right)^2 + \lambda\frac{N - \mathbf{Z}_{n-1}^{(1)}}{N}\frac{\mathbf{Z}_{n-1}^{(1)}}{N}\frac{N}{N} + \ldots$$

The pattern simplifies: the ODE for $s$ choices has the form
$$\frac{\mathrm{d}\mathbf{x}^{(j)}}{\mathrm{d}t} = \lambda\bigl((\mathbf{x}^{(j-1)})^s - (\mathbf{x}^{(j)})^s\bigr) + \mathbf{x}^{(j+1)} - \mathbf{x}^{(j)}.$$

The fixed point has $j$th coordinate close to $\lambda^{(s^j - 1)/(s-1)}$, giving queue lengths
$$j = \frac{1}{\log s}\log\!\left(1 + (s-1)\frac{0.2\log N}{\log \lambda^{-1}}\right).$$

For $s = 2$: divide by $\log 2$. For $s = 3$: divide by $\log 3$ — slightly better constants but the same $\log\log N$ scaling. The improvement from $s = 2$ to $s = 3$ is much less dramatic than from $s = 1$ to $s = 2$.

### exercise: Stability of 2-choice fixed point
**Number:** Exercise 3
**Difficulty:** challenge
**Tags:** load-balancing, ODE-stability, catch-and-throw, long-time

**Question:**
Returning to the choice-of-2 Example 2, show that the fixed point of the ODE is stable. Using a catch-and-throw analysis, argue that in fact the load balancing process is likely to remain close to the fixed point for much longer than $N \log N$ steps.

*(Hint: you will need to think quite hard about how to deal with the "error" for long queues.)*

**Hint 1:** Prove ODE stability
Show that trajectories starting near the fixed point converge to it. The key is that the squared terms create a "restoring force" that pushes the system back towards equilibrium.

**Hint 2:** Apply catch-and-throw (Exercise 12 from Level 18)
Use Exercise 10 (modified exponent) from Level 18 with suitable $\nu$. The main difficulty is controlling errors for long queues — you may need Freedman's inequality instead of Azuma.

**Solution:**
This exercise is quite hard (and the notes don't give a full solution).

There are two main things you need to do. First, you need to prove some stability for the ODE. This is not all that easy, because it's in a high dimension.

Second, you need to improve the Differential Equations Theorem. In that, we used Azuma's inequality. This inequality, more or less, gives the "worst possible" probabilistic estimate for a martingale sum. It turns out the "worst possible" more or less corresponds to independent random variables taking values $B$ and $-B$ with equal probability ($B$ is as in the Differential Equations Theorem). But for the number of long queues, reality is quite far from this: we know that (assuming most queues are short) we're very unlikely to add to a long queue. There are other probabilistic inequalities that we can replace Azuma with, for example Freedman's inequality, which will let us argue the long queues cannot get nearly as big as the analysis above; and you need to know this to make the catch-and-throw method work.
