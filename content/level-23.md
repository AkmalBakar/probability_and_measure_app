---
level: 23
title: "Stopping Times & Optional Stopping"
notes: 6
prerequisites: [22]
---

# Level 23: Stopping Times & Optional Stopping

## Reading

When observing a random process, we often want to "stop" at a random time — sell a stock when it reaches a target price, stop an experiment when a condition is met. The key requirement: the decision to stop must be based on information available **now**, not on the future. This leads to the concept of a **stopping time**.

### Definition of stopping time

**Definition 3 (Stopping time).** Given a filtered probability space $(\Omega, \mathcal{F}, \mathbb{P})$ with filtration $(\mathcal{F}_n)_{n \geq 0}$, a **discrete stopping time** is a random variable $\tau : \Omega \to \mathbb{Z}_{\geq 0} \cup \{\infty\}$ such that $\{\omega : \tau(\omega) = n\}$ is in $\mathcal{F}_n$ for each $n \geq 0$.

The intuition: at each time $n$, based on the information $\mathcal{F}_n$, we can determine whether $\tau = n$ (we stop now) or not. We cannot "predict the future" — the decision to stop at time $n$ depends only on what has happened up to time $n$.

### Examples

1. **Constant times.** The constant function $\tau(\omega) = c$ (for any $c \in \mathbb{Z}_{\geq 0} \cup \{\infty\}$) is a stopping time: $\{\tau = n\}$ is either $\Omega$ or $\emptyset$, both in $\mathcal{F}_n$.

2. **Hitting times.** For a martingale $(X_n)$ adapted to $(\mathcal{F}_n)$ and a real number $a > X_0$, the **hitting time** $\tau(\omega) = \min\{n : X_n(\omega) \geq a\}$ is a stopping time. The event $\{\tau = n\}$ is $\{X_0 < a, X_1 < a, \ldots, X_{n-1} < a, X_n \geq a\}$. Each $\{X_i < a\}$ is $\mathcal{F}_i$-measurable (hence $\mathcal{F}_n$-measurable), and $\{X_n \geq a\}$ is $\mathcal{F}_n$-measurable. The intersection of $\mathcal{F}_n$-measurable sets is $\mathcal{F}_n$-measurable. The "second hitting time," "third hitting time," etc. are also stopping times by similar arguments.

3. **"Last time" is NOT a stopping time.** Consider a simple random walk and define $\tau$ as "the last time $X_n = 1$." This is **not** a stopping time: to know at time $n$ whether $\tau = n$, you would need to know that the walk never returns to 1 in the future — information not available in $\mathcal{F}_n$.

More concretely: consider the process $X_n = \sum_{i=1}^{\min(n,100)} Y_i$ (follows the walk for 100 steps, then stops). The "last time at 1" requires knowing all of $Y_1, \ldots, Y_{100}$, but $\mathcal{F}_1 = \{\emptyset, \{Y_1 = 1\}, \{Y_1 = -1\}, \Omega\}$ doesn't contain enough information to determine if $\tau = 1$.

### The stopped process and optional stopping

If $\tau$ is a stopping time and $(X_n)$ is a martingale (both adapted to the same filtration), the **stopped process** is

$$Y_n(\omega) = X_{\min(n, \tau(\omega))}(\omega) = X_n(\omega)\mathbf{1}_{\tau \geq n} + \sum_{t=0}^{n-1} X_t(\omega)\mathbf{1}_{\tau = t}.$$

This is $(\mathcal{F}_n)$-adapted (all terms are $\mathcal{F}_n$-measurable since $\mathbf{1}_{\tau = t}$ and $\mathbf{1}_{\tau \geq n} = 1 - \mathbf{1}_{\tau \leq n-1}$ are $\mathcal{F}_n$-measurable by definition of stopping time).

The natural question: does $\mathbb{E}(X_\tau) = \mathbb{E}(X_0)$? Intuitively, if the martingale is "fair," stopping shouldn't create a systematic advantage. But this is **false** in general — the doubling strategy shows this:

**Doubling strategy counterexample:** Let $Y_i$ be i.i.d. $\pm 1$ with equal probability, and $X_n = \sum_{i=1}^n 2^{i-1} Y_i$. Let $\tau$ be the first $n$ with $X_n \geq 1$, equivalently the first time $Y_n = 1$. Then $\tau$ is finite a.s. (geometric distribution), but $X_\tau = 1$ a.s., while $X_0 = 0$. So $\mathbb{E}(X_\tau) = 1 \neq 0 = \mathbb{E}(X_0)$.

### When optional stopping works

**Theorem (Optional stopping for bounded stopping times).** If $\tau \leq c$ a.s. for some constant $c$, and $(X_n)$ is a martingale, then the stopped process $(Y_n)$ is a martingale, and in particular $\mathbb{E}(X_\tau) = \mathbb{E}(X_0)$.

*Proof.* The stopped process $(Y_n)$ is $(\mathcal{F}_n)$-adapted (shown above). For the $L_1$ property:

$$\mathbb{E}(|Y_n|) \leq \mathbb{E}(|X_0|) + \cdots + \mathbb{E}(|X_n|) < \infty.$$

For the martingale property: using the summation formula $Y_n = X_n\mathbf{1}_{\tau \geq n} + \sum_{t=0}^{n-1} X_t\mathbf{1}_{\tau=t}$,

$$\mathbb{E}(Y_{n+1} | \mathcal{F}_n) = \mathbb{E}(X_{n+1}\mathbf{1}_{\tau \geq n+1} | \mathcal{F}_n) + \sum_{t=0}^n \mathbb{E}(X_t\mathbf{1}_{\tau=t} | \mathcal{F}_n).$$

The indicator $\mathbf{1}_{\tau \geq n+1} = 1 - \mathbf{1}_{\tau \leq n}$ is $\mathcal{F}_n$-measurable. Using "taking out what is known": $\mathbb{E}(X_{n+1}\mathbf{1}_{\tau \geq n+1} | \mathcal{F}_n) = \mathbf{1}_{\tau \geq n+1}\mathbb{E}(X_{n+1}|\mathcal{F}_n) = X_n\mathbf{1}_{\tau \geq n+1}$. Similarly, $X_t\mathbf{1}_{\tau=t}$ is $\mathcal{F}_n$-measurable for $t \leq n$. So:

$$\mathbb{E}(Y_{n+1}|\mathcal{F}_n) = X_n\mathbf{1}_{\tau \geq n+1} + X_n\mathbf{1}_{\tau=n} + \sum_{t=0}^{n-1} X_t\mathbf{1}_{\tau=t} = X_n\mathbf{1}_{\tau \geq n} + \sum_{t=0}^{n-1} X_t\mathbf{1}_{\tau=t} = Y_n.$$

Since $\tau \leq c$ a.s., $Y_c = X_\tau$ a.s. So $\mathbb{E}(X_\tau) = \mathbb{E}(Y_c) = \mathbb{E}(Y_0) = \mathbb{E}(X_0)$. $\square$

### More general conditions for optional stopping

The result $\mathbb{E}(X_\tau) = \mathbb{E}(X_0)$ also holds under two other standard sets of conditions:

1. **$\mathbb{E}(\tau) < \infty$ and bounded increments:** If there is a constant $c$ such that within $\{\tau \geq t\}$, $|\mathbb{E}(X_{t+1} - X_t | \mathcal{F}_t)(\omega)| \leq c$, then by Markov's inequality $\tau < \infty$ a.s. and the expectation property holds.

2. **Bounded stopped process:** If there is a constant $c$ such that $|X_{\min(t,\tau)}| \leq c$ a.s. for all $t$, then $\mathbb{E}(X_\tau) = \mathbb{E}(X_0)$. In the case $\mathbb{P}(\tau = \infty) > 0$, we define $X_\tau$ as the pointwise limit of $X_t$ where it exists, and show this is a.s.

These conditions are quite restrictive. Most "natural" stopping times (like the first passage time of a simple random walk) don't satisfy any of them! The hitting time for a simple random walk starting at 0 to reach 1 has **infinite** expected stopping time, the martingale is unbounded, and the increments aren't bounded relative to the stopping event.

## Key Results

### definition: Stopping time
**Number:** Definition 3
**Plain English:** A random time $\tau$ where the decision to stop at time $n$ depends only on information available at time $n$ — you can't look into the future.
**Formal:** $\tau : \Omega \to \mathbb{Z}_{\geq 0} \cup \{\infty\}$ with $\{\tau = n\} \in \mathcal{F}_n$ for all $n \geq 0$.
**Load-bearing:** yes

### theorem: Optional stopping (bounded case)
**Number:** Exercise 4 result
**Plain English:** If you stop a martingale at a bounded stopping time, the expected value at the stopping time equals the initial expected value. The stopped process is itself a martingale.
**Formal:** If $(X_n)$ is a martingale, $\tau$ a stopping time with $\tau \leq c$ a.s., then $\mathbb{E}(X_\tau) = \mathbb{E}(X_0)$.
**Proof sketch:** Show the stopped process $Y_n = X_{\min(n,\tau)}$ is a martingale using "taking out what is known" and the $\mathcal{F}_n$-measurability of $\mathbf{1}_{\tau \leq n}$. Then $\mathbb{E}(X_\tau) = \mathbb{E}(Y_c) = \mathbb{E}(Y_0) = \mathbb{E}(X_0)$.
**Key technique:** Stopped process, conditional expectation
**Depends on:** Stopping time definition, martingale properties (Level 17)
**Used by:** Option pricing (Level 24)
**Load-bearing:** yes

## Exercises

### exercise: "Last time" is not a stopping time
**Number:** Exercise 3
**Difficulty:** warm-up
**Tags:** stopping-time, counterexample, measurability

**Question:**
Explain why the above examples are (for "last", is not in general a) stopping times.

**Hint 1:** For constant and hitting times
A constant $\tau = c$: $\{\tau = n\}$ is $\Omega$ or $\emptyset$. For a hitting time: $\{\tau = n\} = \{X_0 < a, \ldots, X_{n-1} < a, X_n \geq a\}$ which is $\mathcal{F}_n$-measurable.

**Hint 2:** For the "last time"
To know at time $n$ that this is the **last** time $X_n = a$, you need to know the walk never returns to $a$ — this requires future information. Consider the halting walk $X_n = \sum_{i=1}^{\min(n,100)} Y_i$ and the $\sigma$-algebra $\mathcal{F}_1$.

**Solution:**
**Constant times:** $\{\tau = n\} = \Omega$ if $n = c$, $\emptyset$ otherwise. Both are in $\mathcal{F}_n$. $\checkmark$

**Hitting times:** For $\tau = \min\{n : X_n \geq a\}$ with $a > X_0$, the event $\{\tau = n\}$ is $\{X_0 < a, X_1 < a, \ldots, X_{n-1} < a, X_n \geq a\}$. Each condition $\{X_i < a\}$ is $\mathcal{F}_i$-measurable hence $\mathcal{F}_n$-measurable, and $\{X_n \geq a\}$ is $\mathcal{F}_n$-measurable. The intersection is $\mathcal{F}_n$-measurable. $\checkmark$ Similarly for "second time," "third time," etc. — the event $\{\tau = n\}$ only involves $X_0, \ldots, X_n$.

**"Last time" is not a stopping time:** Consider the halting walk $X_n = \sum_{i=1}^{\min(n,100)} Y_i$. Let $\tau$ be "the last time the process is at 1." Let $A = \{Y_1 = 1\}$. Since $\mathcal{F}_1 = \{\emptyset, A, \Omega \setminus A, \Omega\}$, if $\tau$ is a stopping time then $\{\tau = 1\}$ must be one of these four sets. But $\{\tau = 1\} \cap A$ depends on whether the walk returns to 1 after time 1, which depends on $Y_2, \ldots, Y_{100}$ — not determined by $\mathcal{F}_1$. Specifically, with probability $\frac{1}{2}$ the process will be at 1 at time 1, and whether it returns to 1 later depends on future coin flips. So $\{\tau = 1\}$ is not in $\mathcal{F}_1$, and $\tau$ is not a stopping time. $\square$

### exercise: Optional stopping for bounded stopping times
**Number:** Exercise 4
**Difficulty:** standard
**Tags:** stopping-time, optional-stopping, martingale, bounded

**Question:**
Prove that if there is $c$ such that $\tau \leq c$ holds almost surely and $\tau$ is a stopping time, then $X_\tau$ exists and has expectation $\mathbb{E}(X_0)$. *Hint: consider the stopped process defined by $Y_n(\omega) = X_n(\omega)$ whenever $n \leq \tau(\omega)$ and $Y_n(\omega) = X_{\tau(\omega)}(\omega)$ whenever $n > \tau(\omega)$. Show that this is a martingale, and use this to prove the required statement.*

**Hint 1:** Show the stopped process is adapted
Write $Y_n = X_n\mathbf{1}_{\tau \geq n} + \sum_{t=0}^{n-1} X_t\mathbf{1}_{\tau = t}$. Since $\mathbf{1}_{\tau = t} \in \mathcal{F}_t \subseteq \mathcal{F}_n$ and $X_t$ is $\mathcal{F}_t$-measurable, each term is $\mathcal{F}_n$-measurable.

**Hint 2:** Prove the martingale property
$\mathbb{E}(Y_{n+1}|\mathcal{F}_n) = \mathbf{1}_{\tau \geq n+1}\mathbb{E}(X_{n+1}|\mathcal{F}_n) + \sum_{t \leq n} X_t\mathbf{1}_{\tau=t} = X_n\mathbf{1}_{\tau \geq n+1} + X_n\mathbf{1}_{\tau=n} + \sum_{t<n} X_t\mathbf{1}_{\tau=t} = Y_n$.

**Solution:**
**Existence:** For $\omega$ with $\tau(\omega) < \infty$ (which is a.s. since $\tau \leq c$), $X_\tau(\omega) = X_{\tau(\omega)}(\omega)$ is well-defined. On $\{\tau = \infty\}$ (measure zero), set $X_\tau = 0$.

**Stopped process is a martingale:** Define $Y_n(\omega) = X_{\min(n,\tau(\omega))}(\omega)$. We can write:

$$Y_n = X_n\mathbf{1}_{\tau \geq n} + \sum_{t=0}^{n-1} X_t\mathbf{1}_{\tau = t}.$$

*Adaptedness:* Each $\mathbf{1}_{\tau = t}$ is $\mathcal{F}_t$-measurable (stopping time definition), hence $\mathcal{F}_n$-measurable for $t \leq n$. Products $X_t\mathbf{1}_{\tau=t}$ are $\mathcal{F}_n$-measurable. Also $\mathbf{1}_{\tau \geq n} = 1 - \sum_{t=0}^{n-1}\mathbf{1}_{\tau=t}$ is $\mathcal{F}_{n-1}$-measurable. So $Y_n$ is $\mathcal{F}_n$-measurable.

*$L_1$ property:* $\mathbb{E}(|Y_n|) \leq \sum_{t=0}^{n} \mathbb{E}(|X_t|) < \infty$.

*Martingale property:*
$$\mathbb{E}(Y_{n+1}|\mathcal{F}_n) = \mathbb{E}(X_{n+1}\mathbf{1}_{\tau \geq n+1}|\mathcal{F}_n) + \sum_{t=0}^{n} \mathbb{E}(X_t\mathbf{1}_{\tau=t}|\mathcal{F}_n).$$

For $t \leq n$: $X_t\mathbf{1}_{\tau=t}$ is $\mathcal{F}_n$-measurable, so the conditional expectation is itself. For the first term: $\mathbf{1}_{\tau \geq n+1}$ is $\mathcal{F}_n$-measurable, so by taking out what is known:

$$\mathbb{E}(X_{n+1}\mathbf{1}_{\tau \geq n+1}|\mathcal{F}_n) = \mathbf{1}_{\tau \geq n+1}\mathbb{E}(X_{n+1}|\mathcal{F}_n) = X_n\mathbf{1}_{\tau \geq n+1}.$$

Combining: $\mathbb{E}(Y_{n+1}|\mathcal{F}_n) = X_n\mathbf{1}_{\tau \geq n+1} + X_n\mathbf{1}_{\tau=n} + \sum_{t=0}^{n-1}X_t\mathbf{1}_{\tau=t} = X_n\mathbf{1}_{\tau \geq n} + \sum_{t=0}^{n-1}X_t\mathbf{1}_{\tau=t} = Y_n$.

**Conclusion:** Since $\tau \leq c$ a.s., $Y_c = X_\tau$ a.s. Since $(Y_n)$ is a martingale: $\mathbb{E}(X_\tau) = \mathbb{E}(Y_c) = \mathbb{E}(Y_0) = \mathbb{E}(X_0)$. $\square$
