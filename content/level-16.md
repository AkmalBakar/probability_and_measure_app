---
level: 16
title: "Radon-Nikodym & Existence of Conditional Expectation"
status: wip
notes: 4
prerequisites: [15]
---

# Level 16: Radon-Nikodym & Existence of Conditional Expectation

## Reading

We have defined conditional expectation by specifying three properties it must satisfy. But we haven't yet shown that such an object always exists! In this level, we prove existence using the **Radon-Nikodym theorem** — a fundamental result in measure theory that allows us to "compare" two measures by finding a density function relating them.

### Absolute continuity and the Radon-Nikodym derivative

Let $(X, \mathcal{F})$ be a measurable space with two different measures $\mu, \nu$ on it. Recall that $\mu$ is called **$\sigma$-finite** if we can write $X$ as a countable union of measurable sets with finite $\mu$-measure.

Suppose there is a non-negative measurable function $f : X \to \mathbb{R}$ such that

$$\nu(A) = \int_{x \in A} f(x) \, \mathrm{d}\mu = \int_X f \mathbf{1}_A \, \mathrm{d}\mu$$

holds for all $A \in \mathcal{F}$.

Then we have $\mu(A) = 0 \implies \nu(A) = 0$. This is immediate from the definition of the integral: whatever simple $g$ we take bounded above by $f \mathbf{1}_A$, it is bounded above by $\infty \cdot \mathbf{1}_A$ which has integral zero. The converse obviously fails: if $f = 0$ on a measurable set $A'$, then we will have $\nu(A') = 0$ whatever $\mu(A')$ is.

If $\mu, \nu$ are any two measures on $(X, \mathcal{F})$, we say $\nu$ is **absolutely continuous with respect to** $\mu$, and write $\nu \ll \mu$, if $\mu(A) = 0 \implies \nu(A) = 0$ for all $A \in \mathcal{F}$. Observe that if a condition holds $\mu$-almost everywhere (i.e. it fails on a set $E$ with $\mu(E) = 0$) then by definition the condition holds $\nu$-almost everywhere; the converse fails.

So what we just did is: if $\nu(A) = \int_A f \, \mathrm{d}\mu$, then $\nu \ll \mu$. The Radon-Nikodym Theorem is a (partial) converse to this — we will only care about $\sigma$-finite measures.

### The Radon-Nikodym Theorem

**Theorem 6 (Radon-Nikodym Theorem).** Let $\mu, \nu$ be $\sigma$-finite measures on $(X, \mathcal{F})$. If $\nu \ll \mu$, then there exists $f : X \to \mathbb{R}$ non-negative and $\mathcal{F}$-measurable, such that for all $A \in \mathcal{F}$ we have

$$\nu(A) = \int_X f \mathbf{1}_A \, \mathrm{d}\mu.$$

We call any $f$ which makes the above equation true the **Radon-Nikodym derivative** $\frac{\mathrm{d}\nu}{\mathrm{d}\mu}$. It's immediate that if $f = g$ holds $\mu$-almost everywhere and $f$ is the Radon-Nikodym derivative, then so is $g$.

The Radon-Nikodym derivative is defined up to equality $\mu$-almost everywhere, and is essentially unique: if $f$ and $g$ are both Radon-Nikodym derivatives, then $f = g$ $\mu$-a.e. (proved by considering $A_n = \{f(x) \geq g(x) + \frac{1}{n}\}$ and showing $\mu(A_n) = 0$).

### The change of measure formula

The Radon-Nikodym derivative quantifies "how different" $\mu$ and $\nu$ are. If for example $\frac{\mathrm{d}\nu}{\mathrm{d}\mu}$ is bounded between $\frac{1}{2}$ and $2$, then $\mu$ and $\nu$ might not be the same measure, but they give the same answer up to a factor of 2 for the measure of any set. This is often "enough for proofs."

**Theorem 7 (Change of measure).** Suppose $\nu \ll \mu$ are $\sigma$-finite measures on $(X, \mathcal{F})$. Then for any $g : X \to \mathbb{R}$ measurable we have

$$\int_X g \, \mathrm{d}\nu = \int_X g \frac{\mathrm{d}\nu}{\mathrm{d}\mu} \, \mathrm{d}\mu.$$

*Proof.* If we can show this holds for any non-negative $g$, then the result for general $g$ holds by writing $g = g^+ - g^-$ and using linearity of the integral.

Suppose $g \geq 0$, and let $g_1, g_2, \ldots$ be a non-negative, monotone increasing sequence of simple functions converging to $g$ pointwise. Then

$$\int_X g \, \mathrm{d}\nu = \lim_{n \to \infty} \int_X g_n \, \mathrm{d}\nu = \lim_{n \to \infty} \sum_i \alpha_{i,n} \nu(A_{i,n}) = \lim_{n \to \infty} \sum_i \alpha_{i,n} \int_X \mathbf{1}_{A_{i,n}} \frac{\mathrm{d}\nu}{\mathrm{d}\mu} \, \mathrm{d}\mu = \lim_{n \to \infty} \int_X g_n \frac{\mathrm{d}\nu}{\mathrm{d}\mu} \, \mathrm{d}\mu = \int_X g \frac{\mathrm{d}\nu}{\mathrm{d}\mu} \, \mathrm{d}\mu,$$

where the outside equalities are the Monotone Convergence Theorem. $\square$

This theorem justifies the word "derivative": the Radon-Nikodym derivative behaves like the usual derivative in a change of measure. In addition, if $\mu$ is the Lebesgue measure on $\mathbb{R}$ and $\nu$ is any continuous distribution with cumulative density function $F$, then $\frac{\mathrm{d}\nu}{\mathrm{d}\mu} = F'$ is a derivative in the usual sense of the word.

### Motivation from finance

In financial mathematics, the concept shows up naturally. Think of placing a bet on the flip of a coin: you bet $\pounds x$, win $\pounds 2x$ if Heads, lose everything if Tails, and can alternatively bank money at interest rate $r$. The "obvious" probability measure $\mathbb{P}$ assigns equal probability to Heads and Tails.

But there is a "useful" different measure: define $q = \frac{1+r}{2}$ and consider the measure $\mathbb{Q}$ with Heads having probability $q$ and Tails having probability $1 - q$. Under $\mathbb{Q}$, the expected return of a $\pounds 1$ bet is $1 + r$, the same as if you chose not to bet at all but to bank the money. This **risk-neutral measure** is a general way to figure out fair prices. The Radon-Nikodym derivative $\frac{\mathrm{d}\mathbb{Q}}{\mathrm{d}\mathbb{P}}$ connects the two measures.

### Existence of conditional expectation

**Theorem 8.** Let $X$ be a random variable on $(\Omega, \mathcal{F}, \mathbb{P})$, and suppose $\mathbb{E}(|X|) < \infty$. Let $\mathcal{G} \subseteq \mathcal{F}$ be a $\sigma$-algebra. Then $\mathbb{E}(X | \mathcal{G})$ exists.

*Proof.* By the usual trick, it suffices to prove the theorem for $X \geq 0$: assuming we have this, then $\mathbb{E}(X^+ | \mathcal{G})$ and $\mathbb{E}(X^- | \mathcal{G})$ exist, and their difference was proved in Theorem 5 to be a version of $\mathbb{E}(X | \mathcal{G})$.

Suppose $X \geq 0$. We define a measure $\nu$ on $(\Omega, \mathcal{G})$ by

$$\nu(A) = \int_\Omega X \mathbf{1}_A \, \mathrm{d}\mathbb{P},$$

and we let $\mu$ be the measure on $(\Omega, \mathcal{G})$ obtained by $\mu(A) = \mathbb{P}(A)$. We claim that $\nu \ll \mu$: indeed, this follows directly from the definition of the integral.

Let $Y = \frac{\mathrm{d}\nu}{\mathrm{d}\mu}$ exist by Theorem 6, applied with these two measures on $(\Omega, \mathcal{G})$.

By definition we have $1 = \nu(\Omega) = \mathbb{E}_\mu(Y)$ which verifies (i). Theorem 6 explicitly guarantees that $Y$ is $\mathcal{G}$-measurable, giving (ii). For (iii), given $A \in \mathcal{G}$ we have

$$\mathbb{E}_{\mathbb{P}}(Y \mathbf{1}_A) = \int_\Omega \mathbf{1}_A \frac{\mathrm{d}\nu}{\mathrm{d}\mu} \, \mathrm{d}\mu = \int_\Omega \mathbf{1}_A \, \mathrm{d}\nu = \nu(A) = \int_\Omega X \mathbf{1}_A \, \mathrm{d}\mathbb{P} = \mathbb{E}_\mathbb{P}(X \mathbf{1}_A)$$

where the middle equality is Theorem 7, and the middle equality uses the definition of $\nu$ and the fact that $\mu(B) = \mathbb{P}(B)$ for all $\mathcal{G}$-measurable $B$. $\square$

## Key Results

### theorem: Radon-Nikodym Theorem
**Number:** Theorem 6
**Plain English:** If $\nu$ is absolutely continuous w.r.t. $\mu$ (both $\sigma$-finite), then $\nu$ has a "density" with respect to $\mu$: a non-negative measurable function $f$ such that $\nu(A) = \int_A f \, \mathrm{d}\mu$.
**Formal:** Let $\mu, \nu$ be $\sigma$-finite measures on $(X, \mathcal{F})$. If $\nu \ll \mu$, there exists non-negative $\mathcal{F}$-measurable $f$ with $\nu(A) = \int_X f \mathbf{1}_A \, \mathrm{d}\mu$ for all $A \in \mathcal{F}$.
**Proof sketch:** Not proved in this course (it uses a Hilbert space argument or Hahn decomposition).
**Key technique:** Existence of density / Radon-Nikodym derivative
**Depends on:** $\sigma$-finiteness, absolute continuity
**Used by:** Theorem 7, Theorem 8 (existence of CE), Level 24 (risk-neutral pricing)
**Load-bearing:** yes

### theorem: Change of measure formula
**Number:** Theorem 7
**Plain English:** To integrate a function against $\nu$, you can instead integrate it (multiplied by $\frac{\mathrm{d}\nu}{\mathrm{d}\mu}$) against $\mu$.
**Formal:** If $\nu \ll \mu$ ($\sigma$-finite), then $\int_X g \, \mathrm{d}\nu = \int_X g \frac{\mathrm{d}\nu}{\mathrm{d}\mu} \, \mathrm{d}\mu$ for any measurable $g$.
**Proof sketch:** Prove for simple functions (immediate), then extend by MCT.
**Key technique:** MCT approximation
**Depends on:** Theorem 6
**Used by:** Theorem 8, financial mathematics (Level 24)
**Load-bearing:** yes

### theorem: Existence of conditional expectation
**Number:** Theorem 8
**Plain English:** Conditional expectation always exists for integrable random variables. The proof constructs it as a Radon-Nikodym derivative.
**Formal:** Let $X$ be a random variable with $\mathbb{E}(|X|) < \infty$ and $\mathcal{G} \subseteq \mathcal{F}$ a sub-$\sigma$-algebra. Then $\mathbb{E}(X|\mathcal{G})$ exists.
**Proof sketch:**
1. WLOG $X \geq 0$ (split into positive and negative parts)
2. Define $\nu(A) = \int_\Omega X \mathbf{1}_A \, \mathrm{d}\mathbb{P}$ on $(\Omega, \mathcal{G})$
3. Let $\mu = \mathbb{P}|_\mathcal{G}$; then $\nu \ll \mu$
4. Take $Y = \frac{\mathrm{d}\nu}{\mathrm{d}\mu}$ by Radon-Nikodym; verify conditions (i)-(iii)
**Key technique:** Radon-Nikodym applied to $\nu$ defined by integrating $X$
**Depends on:** Theorems 5, 6, 7
**Used by:** All subsequent levels using conditional expectation
**Load-bearing:** yes

## Exercises

### exercise: $\nu$ is a measure
**Number:** Exercise 6
**Difficulty:** standard
**Tags:** measure, countable-additivity, MCT, Radon-Nikodym

**Question:**
Let $X$ be a non-negative random variable on $(\Omega, \mathcal{F}, \mathbb{P})$. Define a function $\nu : \mathcal{F} \to \mathbb{R}_{\geq 0}^\infty$ by

$$\nu(A) = \int_\Omega X \mathbf{1}_A \, \mathrm{d}\mathbb{P}.$$

Prove that $\nu$ is a measure on $\mathcal{F}$.

**Hint 1:** Check $\nu(\emptyset) = 0$ and non-negativity
$\nu(\emptyset) = \int_\Omega X \mathbf{1}_\emptyset \, \mathrm{d}\mathbb{P} = \int_\Omega 0 \, \mathrm{d}\mathbb{P} = 0$. Non-negativity follows since $X \geq 0$.

**Hint 2:** Use MCT for countable additivity
Let $A_1, A_2, \ldots$ be disjoint sets in $\mathcal{F}$. Write $X \mathbf{1}_{\bigcup A_n} = \lim_{N \to \infty} X \sum_{k=1}^N \mathbf{1}_{A_k}$. The partial sums are monotone increasing (since $X \geq 0$ and the $A_k$ are disjoint). Apply MCT.

**Solution:**
Trivially $\nu(\emptyset) = 0$ and $\nu \geq 0$, so we need to verify countable additivity. Let $A_1, A_2, \ldots$ be disjoint sets in $\mathcal{F}$. Then we have

$$\nu\!\left(\bigcup_{n \in \mathbb{N}} A_n\right) = \int_\Omega X \sum_{n=1}^{\infty} \mathbf{1}_{A_n} \, \mathrm{d}\mathbb{P} = \lim_{N \to \infty} \int_\Omega X \sum_{k=1}^{N} \mathbf{1}_{A_k} \, \mathrm{d}\mathbb{P} = \lim_{N \to \infty} \sum_{k=1}^{N} \nu(A_k) = \sum_{n=1}^{\infty} \nu(A_n)$$

as required. Here the first equality is the definition of $\nu$ and the fact that the $A_n$ are disjoint; the second is the Monotone Convergence Theorem; the third uses linearity of the integral to pull the finite sum out, and then the definition of $\nu$; and the final equality is the definition of the series. $\square$
