---
level: 21
title: "Convergence of Random Variables & Monte Carlo"
notes: 5
prerequisites: [20]
---

# Level 21: Convergence of Random Variables & Monte Carlo

## Reading

What does it mean for a sequence of random variables to "converge"? Unlike real numbers, random variables are functions, so there are several natural notions of convergence — and they don't all agree. Understanding these distinctions is essential for making rigorous the intuitive idea that "as $n$ grows, $X_n$ gets close to $X$."

### Convergence in distribution

The weakest notion of convergence is **convergence in distribution**. It doesn't even require the random variables to live on the same probability space.

**Definition 7 (Convergence in distribution).** Let $X, X_1, X_2, \ldots$ be random variables, defined on (possibly different) probability spaces. Recall the cumulative distribution function $F(x) = \mathbb{P}(X^{-1}((-\infty, x]))$ and $F_n(x) = \mathbb{P}(X_n^{-1}((-\infty, x]))$.

We say $(X_n)_{n \in \mathbb{N}}$ **converges in distribution** to $X$, written $X_n \xrightarrow{D} X$, if for every $x$ such that $F(x)$ is continuous we have $\lim_{n \to \infty} F_n(x) = F(x)$.

Convergence in distribution is "really" about the distributions, not the random variables themselves. Even if all the random variables live on the same probability space, knowing $X_n(\omega) \to X(\omega)$ pointwise tells us nothing about convergence in distribution, and vice versa. The Central Limit Theorem is the classic example: the normalized sum converges in distribution to a Gaussian, but this says nothing about pointwise behavior.

### Pointwise and almost sure convergence

**Definition 8 (Pointwise and almost sure convergence).** Let $X$ and $(X_n)_{n \in \mathbb{N}}$ be random variables on $(\Omega, \mathcal{F}, \mathbb{P})$. We say $(X_n)$ **converges pointwise** to $X$ if $X_n(\omega) \to X(\omega)$ for every $\omega \in \Omega$.

We say $(X_n)$ **converges almost surely** if $\lim_{n \to \infty} X_n(\omega) = X(\omega)$ holds except possibly on a set of measure zero.

Pointwise convergence is stronger than almost sure convergence. Note that pointwise convergence doesn't need a probability space at all — it's just convergence of functions. Almost sure convergence does require one, since it refers to "measure zero." Two measures with the same null sets give the same notion of almost sure convergence.

Almost sure convergence is usually what we want when studying convergence of functions of random variables. If $f : \mathbb{R} \to \mathbb{R}$ is continuous and $X_n \to X$ almost surely, then $f(X_n) \to f(X)$ almost surely — this follows immediately from the sequential characterization of continuity.

### Convergence in probability

**Definition 9 (Convergence in probability).** Let $X$ and $(X_n)_{n \in \mathbb{N}}$ be random variables on $(\Omega, \mathcal{F}, \mathbb{P})$. We say $(X_n)$ **converges in probability** to $X$, written $X_n \xrightarrow{\mathbb{P}} X$, if for every $\varepsilon > 0$ we have $\lim_{n \to \infty} \mathbb{P}(|X_n - X| > \varepsilon) = 0$.

Almost sure convergence implies convergence in probability. To see this: if $X_n \to X$ a.s., then for any $\varepsilon > 0$, define $A_n = \bigcup_{m \geq n} \{\omega : |X_m(\omega) - X(\omega)| \geq \varepsilon\}$. The sets $A_n$ are decreasing, and $\bigcap_n A_n$ contains only $\omega$ where $X_n(\omega) \not\to X(\omega)$, so $\mathbb{P}(\bigcap_n A_n) = 0$. By continuity of measure, $\mathbb{P}(A_n) \to 0$, and since $\{|X_n - X| \geq \varepsilon\} \subseteq A_n$, convergence in probability follows.

The converse fails: convergence in probability does **not** imply almost sure convergence. The standard counterexample uses "sliding bumps": define $f_{k,n}(x) = \mathbf{1}_{2^{-n}k \leq x \leq 2^{-n}(k+1)}$ on $[0,1]$ with Lebesgue measure, for $0 \leq k \leq 2^n - 1$. Any sequence $f_{k_i, n_i}$ with $n_i \to \infty$ converges in probability to 0 (since $\mathbb{P}(|f_{k,n}| > \varepsilon) = 2^{-n}$), but for every $x \in [0,1]$, $f_{k_i,n_i}(x) = 1$ infinitely often, so there is no pointwise (hence no a.s.) convergence.

### Convergence in probability implies convergence in distribution

On the same probability space, convergence in probability implies convergence in distribution. The proof uses a union bound trick: for any $a \in \mathbb{R}$ and $\varepsilon > 0$,

$$\mathbb{P}(X \leq a) \leq \mathbb{P}(X_n \leq a + \varepsilon) + \mathbb{P}(|X - X_n| > \varepsilon),$$

and similarly $\mathbb{P}(X_n \leq a) \leq \mathbb{P}(X \leq a + \varepsilon) + \mathbb{P}(|X - X_n| > \varepsilon)$. Combining and letting $n \to \infty$ then $\varepsilon \to 0$ (at continuity points of $F$) gives $F_n(a) \to F(a)$.

### $L_p$ convergence

The final family of convergence notions comes from analysis: convergence in the $L_p$ norm.

Recall $\|f\|_p := \left(\int_\Omega |f|^p \, \mathrm{d}\mathbb{P}\right)^{1/p}$ for $1 \leq p < \infty$, and $\|f\|_\infty = \mathrm{ess\,sup}_{\omega \in \Omega} |f(\omega)|$. These are seminorms (norms up to a.s. equality). $L_p(\Omega, \mathcal{F}, \mathbb{P})$ is the space of measurable functions with $\|f\|_p < \infty$.

**Definition 10 (Convergence in $L_p$).** Let $1 \leq p \leq \infty$, and let $X$ and $(X_n)_{n \in \mathbb{N}}$ be random variables in $L_p(\Omega, \mathcal{F}, \mathbb{P})$. We say $(X_n)$ converges to $X$ in $L_p$ if $\lim_{n \to \infty} \|X_n - X\|_p = 0$.

**Theorem 11.** Let $1 \leq p < q \leq \infty$ and let $X, (X_n)$ be in $L_q(\Omega, \mathcal{F}, \mathbb{P})$. If $(X_n)$ converges to $X$ in $L_q$, then $(X_n)$ also converges to $X$ in $L_p$.

*Proof sketch.* For $q = \infty$: if $\|X - X_n\|_\infty < \varepsilon$ then $|X - X_n| \leq \varepsilon$ a.s., so $\mathbb{E}(|X - X_n|^p) \leq \varepsilon^p$. For $q < \infty$: split $\mathbb{E}(|X - X_n|^p)$ into the regions $\{|X - X_n| \geq c\}$ and $\{|X - X_n| < c\}$. On the first, bound $|X - X_n|^p \leq c^{p-q}|X - X_n|^q$; on the second, bound by $c^p$. This gives $\mathbb{E}(|X - X_n|^p) \leq c^{p-q}\mathbb{E}(|X-X_n|^q) + c^p\mathbb{P}(\Omega)$. Since $\mathbb{E}(|X-X_n|^q) \to 0$, for large $n$ we get $\mathbb{E}(|X-X_n|^p) \leq 2c^p$, and $c$ is arbitrary. $\square$

The key point: on a probability space ($\mathbb{P}(\Omega) = 1$), higher $L_q$ convergence implies lower $L_p$ convergence. This is special to finite measure spaces — on $\mathbb{R}$ with Lebesgue measure it fails.

In general, for finite $p$, $L_p$ convergence does **not** imply almost sure convergence and vice versa. However, $L_\infty$ convergence does imply almost sure convergence.

### Holder's inequality

**Theorem 12 (Holder's inequality).** Let $f, g$ be functions on $(\Omega, \mathcal{F}, \mathbb{P})$. Suppose $1 \leq p, q \leq \infty$ satisfy $\frac{1}{p} + \frac{1}{q} = 1$. Then

$$\|fg\|_1 \leq \|f\|_p \|g\|_q.$$

The numbers $p$ and $q$ are called **Holder conjugates**. The case $p = q = 2$ is the **Cauchy-Schwarz inequality**. Holder's inequality is useful for "transferring" convergence: if $(X_n)$ converges in $L_p$ to $X$ and $Y$ is any random variable in $L_q$, then $\|(X_n - X)Y\|_1 \leq \|X_n - X\|_p \|Y\|_q \to 0$, so the expectations $\mathbb{E}(X_n Y) \to \mathbb{E}(XY)$.

### Summary of implications

$$L_\infty \implies \text{a.s.} \implies \text{in probability} \implies \text{in distribution}$$
$$L_q \implies L_p \quad (q > p) \qquad \text{a.s.} \implies \text{in probability}$$

None of the reverse implications hold in general (on a probability space). The "sliding bump" example shows convergence in $L_p$ (any finite $p$) need not give a.s. convergence.

### Monte Carlo estimation

A fundamental computational problem: estimate $\int_\Omega f \, \mathrm{d}\mathbb{P}$. For well-behaved $f$ on nice sets, deterministic methods work. But if $\Omega = [0,1]^d$ with large $d$, deterministic grid methods require $N^d$ evaluations — exponential in $d$.

**Theorem 13 (Monte Carlo estimation).** Suppose $f$ is any measurable function on $(\Omega, \mathcal{F}, \mathbb{P})$ bounded by $B$. Let $\omega_1, \ldots, \omega_n$ be independent samples from $\Omega$ according to $\mathbb{P}$. Then with probability at least $1 - 2e^{-t^2n/(2B^2)}$,

$$\left|\frac{f(\omega_1) + \cdots + f(\omega_n)}{n} - \int_\Omega f \, \mathrm{d}\mathbb{P}\right| \leq t.$$

*Proof.* The $f(\omega_i)$ are independent identically distributed random variables (formally, on $\Omega^n$ with product measure), whose expectations are $\int_\Omega f \, \mathrm{d}\mathbb{P}(f)$. Hoeffding's inequality gives the result directly. $\square$

The mean $\frac{1}{n}\sum_{i=1}^n f(\omega_i)$ is a **Monte Carlo estimate** of the integral. The key advantage: the error bound depends on $n$ and $B$ but **not on the dimension** $d$. This is why Monte Carlo methods dominate high-dimensional integration.

For discrete sampling (e.g., from a lattice $\{0, \frac{1}{N}, \ldots, \frac{N-1}{N}\}^d$), if $f$ is $L$-Lipschitz, the discretization adds at most $L/N$ error. With $N = 2^s$, we only need $ds$ random bits per sample point.

### Markov chain Monte Carlo

If we can't sample directly from $\mathbb{P}$, we can construct an ergodic Markov chain whose stationary distribution is $\mathbb{P}$, run it until it's "close enough," and use the output as approximate samples. This is **Markov chain Monte Carlo (MCMC)**.

In practice, there are pitfalls: the chain must be rapidly mixing, and heuristic "convergence tests" can be misleading. The infection model from Notes 4 illustrates this: with $\lambda > \rho$, the chain stays near $\frac{\lambda}{\lambda - \rho}$ for exponentially long, looking "converged," but the true stationary distribution is at 0.

## Key Results

### definition: Convergence in distribution
**Number:** Definition 7
**Plain English:** Random variables converge in distribution if their CDFs converge at every continuity point. The random variables need not live on the same space.
**Formal:** $X_n \xrightarrow{D} X$ if $\lim_{n \to \infty} F_n(x) = F(x)$ for every $x$ where $F$ is continuous, where $F_n, F$ are the CDFs of $X_n, X$.
**Load-bearing:** yes

### definition: Almost sure convergence
**Number:** Definition 8
**Plain English:** $X_n \to X$ almost surely if the set of $\omega$ where $X_n(\omega) \not\to X(\omega)$ has probability zero.
**Formal:** $\lim_{n \to \infty} X_n(\omega) = X(\omega)$ for all $\omega$ except on a set of $\mathbb{P}$-measure zero.
**Load-bearing:** yes

### definition: Convergence in probability
**Number:** Definition 9
**Plain English:** For every tolerance $\varepsilon$, the probability that $X_n$ differs from $X$ by more than $\varepsilon$ goes to zero.
**Formal:** $X_n \xrightarrow{\mathbb{P}} X$ if $\lim_{n \to \infty} \mathbb{P}(|X_n - X| > \varepsilon) = 0$ for every $\varepsilon > 0$.
**Load-bearing:** yes

### definition: Convergence in $L_p$
**Number:** Definition 10
**Plain English:** $X_n \to X$ in $L_p$ if the $p$-th moment of the difference goes to zero.
**Formal:** $\lim_{n \to \infty} \|X_n - X\|_p = 0$, where $\|f\|_p = (\mathbb{E}(|f|^p))^{1/p}$.
**Load-bearing:** yes

### theorem: $L_q$ convergence implies $L_p$ convergence
**Number:** Theorem 11
**Plain English:** On a probability space, if you converge in a stronger $L_q$ norm ($q > p$), you automatically converge in the weaker $L_p$ norm.
**Formal:** Let $1 \leq p < q \leq \infty$. If $(X_n) \to X$ in $L_q$, then $(X_n) \to X$ in $L_p$.
**Proof sketch:** Split $\mathbb{E}(|X-X_n|^p)$ into $\{|X-X_n| \geq c\}$ and $\{|X-X_n| < c\}$. Use $|X-X_n|^p \leq c^{p-q}|X-X_n|^q$ on the first part. The $L_q$ convergence makes the first term small; the second is $O(c^p)$, and $c$ is arbitrary.
**Key technique:** Splitting integral by level sets
**Depends on:** $L_p$ spaces, $\mathbb{P}(\Omega) = 1$
**Used by:** Relating different modes of convergence
**Load-bearing:** yes

### theorem: Holder's inequality
**Number:** Theorem 12
**Plain English:** The integral of a product is at most the product of the $L_p$ and $L_q$ norms, when $\frac{1}{p} + \frac{1}{q} = 1$.
**Formal:** $\|fg\|_1 \leq \|f\|_p\|g\|_q$ for Holder conjugates $p, q$.
**Proof sketch:** Not proved (standard analysis result). Equality iff $\alpha|f|^p = \beta|g|^q$ a.s.
**Key technique:** Convexity (Young's inequality)
**Depends on:** $L_p$ spaces
**Used by:** Transferring convergence via products, Cauchy-Schwarz as special case
**Load-bearing:** yes

### theorem: Monte Carlo estimation
**Number:** Theorem 13
**Plain English:** Averaging $n$ independent samples of a bounded function gives an estimate of its integral, with dimension-free error bounds.
**Formal:** If $|f| \leq B$ and $\omega_1, \ldots, \omega_n$ are i.i.d. from $\mathbb{P}$, then $|\frac{1}{n}\sum f(\omega_i) - \int f \, \mathrm{d}\mathbb{P}| \leq t$ with probability $\geq 1 - 2e^{-t^2n/(2B^2)}$.
**Proof sketch:** Direct application of Hoeffding's inequality to i.i.d. samples.
**Key technique:** Hoeffding's inequality
**Depends on:** Hoeffding (Level 10), independence
**Used by:** Option pricing (Level 24), MCMC
**Load-bearing:** yes

## Exercises

### exercise: Continuous functions preserve a.s. convergence
**Number:** Exercise 8
**Difficulty:** warm-up
**Tags:** convergence, almost-sure, continuity

**Question:**
Suppose $f : \mathbb{R} \to \mathbb{R}$ is any continuous function, and $X_n \to X$ almost surely. Prove that $f(X_n) \to f(X)$ almost surely.

**Hint 1:** Use the sequential characterization of continuity
If $X_n(\omega) \to X(\omega)$ and $f$ is continuous, then $f(X_n(\omega)) \to f(X(\omega))$ by the definition of continuity in analysis.

**Hint 2:** Identify the exceptional set
The set where $X_n(\omega) \not\to X(\omega)$ has measure zero by assumption. On the complement, apply the previous hint.

**Solution:**
Let $A = \{\omega \in \Omega : X_n(\omega) \not\to X(\omega)\}$. By assumption $\mathbb{P}(A) = 0$. For $\omega \notin A$, we have $X_n(\omega) \to X(\omega)$. By the sequential characterization of continuity (from analysis), since $f$ is continuous at $X(\omega)$, we have $f(X_n(\omega)) \to f(X(\omega))$. Thus $f(X_n) \to f(X)$ on $\Omega \setminus A$, so $f(X_n) \to f(X)$ almost surely. $\square$

### exercise: Almost sure implies in probability
**Number:** Exercise 9
**Difficulty:** standard
**Tags:** convergence, almost-sure, in-probability, continuity-of-measure

**Question:**
Suppose $(X_n)_{n \in \mathbb{N}}$ converges almost surely to $X$. By considering, for a given $\varepsilon > 0$, the sets $\bigcup_{m \geq n} \{\omega \in \Omega : |X_m(\omega) - X(\omega)| \geq \varepsilon\}$, argue that $X_n \xrightarrow{\mathbb{P}} X$.

**Hint 1:** Show the intersection has measure zero
Let $A_n = \bigcup_{m \geq n}\{|X_m - X| \geq \varepsilon\}$. If $\omega \in \bigcap_n A_n$, then for every $n$ there exists $m \geq n$ with $|X_m(\omega) - X(\omega)| \geq \varepsilon$, so $X_m(\omega) \not\to X(\omega)$.

**Hint 2:** Apply continuity of measure
The sets $A_n$ decrease, and $\bigcap_n A_n$ has measure zero by almost sure convergence. By continuity of measure (from above), $\mathbb{P}(A_n) \to 0$. Since $\{|X_n - X| \geq \varepsilon\} \subseteq A_n$, we get $\mathbb{P}(|X_n - X| \geq \varepsilon) \to 0$.

**Solution:**
Fix $\varepsilon > 0$. Let $A_n = \bigcup_{m \geq n}\{\omega : |X_m(\omega) - X(\omega)| \geq \varepsilon\}$. The $A_n$ are decreasing. If $\omega \in \bigcap_{n \in \mathbb{N}} A_n$, then for every $n$ there exists $m \geq n$ with $|X_m(\omega) - X(\omega)| \geq \varepsilon$, which means $X_m(\omega) \not\to X(\omega)$. By definition of almost sure convergence, $\bigcap_n A_n$ is contained in a set of measure zero, so $\mathbb{P}(\bigcap_n A_n) = 0$.

By continuity of measure (applied to the decreasing sequence $A_n$), $\lim_{n \to \infty} \mathbb{P}(A_n) = 0$. Since $\{|X_n - X| \geq \varepsilon\} \subseteq A_n$ for each $n$, monotonicity gives $\mathbb{P}(|X_n - X| \geq \varepsilon) \leq \mathbb{P}(A_n) \to 0$. This holds for all $\varepsilon > 0$, verifying convergence in probability. $\square$

### exercise: Convergence in probability does not imply a.s. convergence
**Number:** Exercise 10
**Difficulty:** standard
**Tags:** convergence, counterexample, sliding-bumps

**Question:**
Let $f_{k,n}(x) : [0,1] \to \mathbb{R}$, for each $n \in \mathbb{N}$ and $0 \leq k \leq 2^n - 1$, be defined by $f_{k,n}(x) = \mathbf{1}_{2^{-n}k \leq x \leq 2^{-n}(k+1)}$. Considering $[0,1]$ with Lebesgue measure as a probability space, show that any sequence $(f_{k_i, n_i})_{i \in \mathbb{N}}$ with $n_i \to \infty$ converges in probability to the constant zero function.

Give an example of how to choose $(k_i, n_i)_{i \in \mathbb{N}}$ such that for every $x \in [0,1]$ we have $f_{k_i, n_i}(x) = 1$ infinitely often as $i \to \infty$, and explain why this implies the sequence does not converge almost surely to any limit.

**Hint 1:** Convergence in probability
For $\varepsilon > 0$: if $\varepsilon \geq 1$ then $\mathbb{P}(|f_{k,n}| > \varepsilon) = 0$. If $0 < \varepsilon < 1$ then $\mathbb{P}(|f_{k,n}| > \varepsilon) = 2^{-n} \to 0$ as $n \to \infty$.

**Hint 2:** Failure of a.s. convergence
Consider the sequence $(0,1), (1,1), (0,2), (1,2), (2,2), (3,2), (0,3), \ldots$ where for each $n$ we run through all $k = 0, \ldots, 2^n - 1$. Every $x$ is covered infinitely often. Since $(f_{k_i,n_i}(x))$ takes the values 0 and 1 infinitely often, it doesn't converge.

**Solution:**
**Convergence in probability:** If $\varepsilon > 1$, then $\mathbb{P}(|f_{k,n} - 0| > \varepsilon) = 0$. If $0 < \varepsilon \leq 1$, then $\mathbb{P}(|f_{k,n}| > \varepsilon) = 2^{-n}$. Since $n_i \to \infty$, we have $2^{-n_i} \to 0$, confirming convergence in probability to 0.

**No a.s. convergence:** Consider the sequence $(k_i, n_i)$ given by

$$(0,1), (1,1), (0,2), (1,2), (2,2), (3,2), (0,3), (1,3), \ldots$$

For each $n \in \mathbb{N}$, we cycle through all $k = 0, 1, \ldots, 2^n - 1$. For any $x \in [0,1]$, and any $n$, there exists $k$ with $x \in [2^{-n}k, 2^{-n}(k+1)]$, so $f_{k,n}(x) = 1$. Thus $f_{k_i,n_i}(x) = 1$ infinitely often. But also $f_{k_i,n_i}(x) = 0$ infinitely often (for most $k$ values). So the sequence takes values in $\{0,1\}$ with both values occurring infinitely often — it does not converge pointwise at any $x$. Since the set of non-converging points is all of $[0,1]$ (measure 1), the sequence does not converge almost surely. $\square$

### exercise: Convergence in probability implies in distribution
**Number:** Exercise 11
**Difficulty:** standard
**Tags:** convergence, in-probability, in-distribution, union-bound

**Question:**
Use the union bound to prove that $\mathbb{P}(X \leq a) \leq \mathbb{P}(Y \leq a + \varepsilon) + \mathbb{P}(|X - Y| > \varepsilon)$ for any random variables $X, Y$.

Let $X$ and $(X_n)_{n \in \mathbb{N}}$ be random variables on $(\Omega, \mathcal{F}, \mathbb{P})$; suppose that $X_n \xrightarrow{\mathbb{P}} X$. Prove that $X_n \xrightarrow{D} X$.

**Hint 1:** Prove the union bound inequality
If $X(\omega) \leq a$, then either $Y(\omega) \leq a + \varepsilon$ or $|X(\omega) - Y(\omega)| > \varepsilon$ (if $Y > a + \varepsilon$ then $Y - X > \varepsilon$). So $\{X \leq a\} \subseteq \{Y \leq a + \varepsilon\} \cup \{|X-Y| > \varepsilon\}$.

**Hint 2:** Squeeze the CDFs
Apply the inequality twice (with $X, X_n$ and with $X_n, X$) to get $F(a - \varepsilon) - \mathbb{P}(|X - X_n| > \varepsilon) \leq F_n(a) \leq F(a + \varepsilon) + \mathbb{P}(|X - X_n| > \varepsilon)$. Let $n \to \infty$, then $\varepsilon \to 0$ at continuity points.

**Solution:**
**Union bound inequality:** If $\omega$ satisfies $X(\omega) \leq a$ but $Y(\omega) > a + \varepsilon$, then $|X(\omega) - Y(\omega)| \geq Y(\omega) - X(\omega) > \varepsilon$. So $\{X \leq a\} \subseteq \{Y \leq a + \varepsilon\} \cup \{|X - Y| > \varepsilon\}$, and the union bound gives $\mathbb{P}(X \leq a) \leq \mathbb{P}(Y \leq a + \varepsilon) + \mathbb{P}(|X - Y| > \varepsilon)$.

**Convergence:** Applying this with $X, X_n$ and $a$: $F(a) \leq F_n(a + \varepsilon) + \mathbb{P}(|X - X_n| > \varepsilon)$. Applying with $X_n, X$ and $a - \varepsilon$: $F_n(a - \varepsilon) \leq F(a) + \mathbb{P}(|X - X_n| > \varepsilon)$. Rearranging: applying the first inequality with $a$ replaced by $a - \varepsilon$:

$$F(a - \varepsilon) - \mathbb{P}(|X-X_n|>\varepsilon) \leq F_n(a) \leq F(a+\varepsilon) + \mathbb{P}(|X-X_n|>\varepsilon).$$

Since $X_n \xrightarrow{\mathbb{P}} X$, as $n \to \infty$ the error terms vanish: $F(a-\varepsilon) \leq \liminf F_n(a) \leq \limsup F_n(a) \leq F(a+\varepsilon)$. If $F$ is continuous at $a$, letting $\varepsilon \to 0$ gives $F(a) \leq \liminf F_n(a) \leq \limsup F_n(a) \leq F(a)$, so $F_n(a) \to F(a)$. $\square$

### exercise: $L_p$ containment and convergence
**Number:** Exercise 12
**Difficulty:** challenge
**Tags:** Lp-spaces, convergence, containment, counterexample

**Question:**
Fix $1 \leq p < q \leq \infty$, and let $(\Omega, \mathcal{F}, \mathbb{P})$ be Lebesgue measure on $[0,1)$. By considering $f(x) = (1-x)^{-\alpha}$ and $f_n = n^\alpha \mathbf{1}_{[0,1/n)}$ for suitably chosen $\alpha$, argue that there are functions in $L_p$ which are not in $L_q$, and demonstrate that even if an $L_p$-convergent sequence of functions are in $L_q$, nevertheless it can be that the sequence does not converge in $L_q$.

**Hint 1:** Failure of containment
Use $f(x) = (1-x)^{-\alpha}$ with $\alpha$ chosen so that $\alpha p < 1 < \alpha q$. Then $\int_0^1 |f|^p \, \mathrm{d}x < \infty$ but $\int_0^1 |f|^q \, \mathrm{d}x = \infty$.

**Hint 2:** Convergence in $L_p$ but not $L_q$
$\|f_n\|_p^p = n^{\alpha p - 1} \to 0$ when $\alpha p < 1$, so $f_n \to 0$ in $L_p$. But $\|f_n\|_q^q = n^{\alpha q - 1} \to \infty$ when $\alpha q > 1$, so $f_n$ doesn't even stay in $L_q$, let alone converge.

**Solution:**
**Containment failure:** Choose $\alpha$ with $\frac{1}{q} < \alpha < \frac{1}{p}$ (so $\alpha p < 1 < \alpha q$). Let $f(x) = (1-x)^{-\alpha}$. Then

$$\mathbb{E}(f^p) = \int_0^1 (1-x)^{-\alpha p} \, \mathrm{d}x = \frac{1}{1 - \alpha p} < \infty$$

so $f \in L_p$. But for $0 < c < 1$:

$$\int_0^c (1-x)^{-\alpha q} \, \mathrm{d}x = \frac{1}{\alpha q - 1}\bigl((1-c)^{1-\alpha q} - 1\bigr) \to \infty \text{ as } c \to 1^-$$

since $1 - \alpha q < 0$. So $f \notin L_q$.

**Convergence failure:** Let $f_n = n^\alpha \mathbf{1}_{[0,1/n)}$. Each $f_n$ is simple, hence in all $L_p$ spaces. We have $\|f_n\|_p^p = n^{\alpha p} \cdot n^{-1} = n^{\alpha p - 1} \to 0$ since $\alpha p < 1$, so $f_n \to 0$ in $L_p$. But $\|f_n\|_q^q = n^{\alpha q - 1} \to \infty$ since $\alpha q > 1$. So $\|f_n - 0\|_q \to \infty$: the sequence does not converge in $L_q$, even though the $L_p$-limit (the zero function) is in $L_q$. $\square$

### exercise: $L_p$ convergence does not imply a.s. convergence
**Number:** Exercise 13
**Difficulty:** standard
**Tags:** Lp-convergence, almost-sure, counterexample

**Question:**
Using the example from Exercise 10, prove that convergence in $L_p$ for any $1 \leq p < \infty$ does not imply convergence almost surely.

Prove that convergence in $\|\cdot\|_\infty$ **does** imply almost sure convergence.

**Hint 1:** $L_p$ convergence of the sliding bumps
$\|f_{k,n}\|_p^p = 2^{-n} \to 0$. So any sequence with $n_i \to \infty$ converges in $L_p$ to 0.

**Hint 2:** $L_\infty$ implies a.s.
If $\|f_n - f\|_\infty \to 0$, then for each $\varepsilon > 0$ there exists $N$ with $|f_n - f| \leq \varepsilon$ a.s. for $n \geq N$. Take $\varepsilon = 1/m$ and use a countable intersection.

**Solution:**
**$L_p$ does not imply a.s.:** From Exercise 10, the sliding bump sequence $f_{k_i,n_i}$ with $n_i \to \infty$ satisfies $\|f_{k_i,n_i}\|_p^p = 2^{-n_i} \to 0$, so it converges in $L_p$ to the zero function. But we showed in Exercise 10 that it does not converge almost surely.

**$L_\infty$ implies a.s.:** Suppose $(f_n) \to f$ in $L_\infty$. Given $\varepsilon > 0$, there exists $N$ such that $\|f_n - f\|_\infty < \varepsilon$ for $n \geq N$. This means $\mathbb{P}(A_\varepsilon) = 0$ where $A_\varepsilon = \{|f_n - f| > \varepsilon \text{ for some } n \geq N\}$. Take $\varepsilon = 1/m$ for $m \in \mathbb{N}$: let $A_{1/m}$ be the corresponding null set. Then $A = \bigcup_{m \in \mathbb{N}} A_{1/m}$ is a countable union of null sets, hence null. For $\omega \notin A$, for every $m$ there exists $N_m$ with $|f_n(\omega) - f(\omega)| \leq 1/m$ for all $n \geq N_m$. This gives $f_n(\omega) \to f(\omega)$. So $f_n \to f$ almost surely. $\square$

### exercise: Monte Carlo with discretization
**Number:** Exercise 14
**Difficulty:** standard
**Tags:** Monte-Carlo, Hoeffding, discretization, Lipschitz

**Question:**
Suppose $f$ is $L$-Lipschitz continuous and bounded by $B$ on $[0,1]^d$. Suppose a computer has access to independent uniform random samples from the lattice $\{0, \frac{1}{N}, \ldots, \frac{N-1}{N}\}^d$. Explain why with probability at least $1 - 2e^{-t^2n/(2B^2)}$, we can obtain a Monte Carlo estimate of the integral with error at most $t + L/N$.

Suppose that $N = 2^s$ for some $s \in \mathbb{N}$. Argue that it is enough for the computer to have access to independent uniform random bits (samples from $\{0, 1\}$).

**Hint 1:** Lattice approximation
Observe that $[0,1]^d$ splits into $N^d$ disjoint lattice cubes of side $1/N$. A uniform random point $\mathbf{x} \in [0,1]^d$ maps to its lattice point $\mathcal{L}(\mathbf{x})$ with $|\mathbf{x} - \mathcal{L}(\mathbf{x})| \leq 1/N$ per coordinate. By Lipschitz continuity, $|f(\mathcal{L}(\mathbf{x})) - f(\mathbf{x})| \leq L/N$.

**Hint 2:** Binary sampling
Each coordinate of a lattice point in $\{0, 1/N, \ldots, (N-1)/N\}$ can be written as $s$ binary digits. So $ds$ random bits give one uniform lattice point in $d$ dimensions.

**Solution:**
**Discretization:** The cube $[0,1]^d$ is partitioned (up to a boundary of measure zero) into $N^d$ equal sub-cubes, each corresponding to a lattice point $\mathcal{L}(\mathbf{x})$. A uniform random point $\mathbf{x} \in [0,1]^d$ produces a uniformly distributed lattice point $\mathcal{L}(\mathbf{x})$. By Theorem 13, with probability $\geq 1 - 2e^{-t^2n/(2B^2)}$, the sample mean of $n$ i.i.d. uniform points satisfies:

$$\left|\frac{f(\mathbf{x}_1) + \cdots + f(\mathbf{x}_n)}{n} - \int_{[0,1]^d} f \, \mathrm{d}\mathbb{P}\right| \leq t.$$

By $L$-Lipschitz continuity, $|f(\mathcal{L}(\mathbf{x})) - f(\mathbf{x})| \leq L/N$ (the lattice point differs by at most $1/N$ in each coordinate). Therefore:

$$\left|\frac{f(\mathcal{L}(\mathbf{x}_1)) + \cdots + f(\mathcal{L}(\mathbf{x}_n))}{n} - \int f \, \mathrm{d}\mathbb{P}\right| \leq t + L/N.$$

**Binary sampling:** If $N = 2^s$, each number in $\{0, 1, \ldots, N-1\}$ corresponds to an $s$-bit binary string. So sampling a uniform element of $\{0, \ldots, N-1\}$ requires exactly $s$ random bits. For a $d$-dimensional lattice point, we need $d$ coordinates, hence $ds$ random bits total. This gives an independent uniform sample from the lattice $\{0, \frac{1}{N}, \ldots, \frac{N-1}{N}\}^d$. $\square$
