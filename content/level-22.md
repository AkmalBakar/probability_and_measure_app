---
level: 22
title: "Martingale Transforms & Representation"
notes: 6
prerequisites: [17]
---

# Level 22: Martingale Transforms & Representation

## Reading

We now return to martingale theory with a deeper look at **martingale transforms** — the discrete analogue of stochastic integrals. The key question: given a martingale, can we decompose it into a "betting strategy" applied to a simpler reference martingale?

### Martingale transforms

Let $(\Omega, \mathcal{F}, \mathbb{P})$ with $(\mathcal{F}_n)_{n \geq 0}$ be a filtered probability space. Suppose $\sum_{i=1}^n Y_i$ is a **reference martingale** by summation adapted to the filtration (i.e., $\mathbb{E}(Y_i | \mathcal{F}_{i-1}) = 0$ for all $i$, and the $Y_i$ are in $L_1$): this means $\mathcal{F}_n = \sigma(Y_1, \ldots, Y_n)$.

**Definition 1 (Martingale transform).** Given $(\Omega, \mathcal{F}, \mathbb{P})$ with filtration $(\mathcal{F}_n)_{n \geq 0}$, let $\sum_{i=1}^n Y_i$ be a martingale by summation adapted to the filtration. Let $(C_n)_{n \geq 0}$ be any process adapted to $(\mathcal{F}_n)$. Then the **martingale transform** is $\sum_{i=1}^n C_{i-1} Y_i$.

The idea is that $C_{i-1}$ is the "bet size" chosen at time $i-1$ (based on information available up to that point), and $Y_i$ is the "outcome" at time $i$. The index shift is important: $C_{i-1}$ is $\mathcal{F}_{i-1}$-measurable (decided before seeing $Y_i$), making it a **previsible** (or **predictable**) process.

Equivalently, starting with a martingale $(Z_n)_{n \geq 0}$, define $Y_n = Z_n - Z_{n-1}$ (the **martingale difference sequence**). Then $\sum_{i=1}^n C_{i-1} Y_i$ is the martingale transform.

If $\|C_n\| < \infty$ for each $n$, then the martingale transform is itself a martingale. This was stated in the course; the proof uses linearity of conditional expectation and the "taking out what is known" property:

$$\mathbb{E}\!\left(\sum_{i=1}^n C_{i-1}Y_i \,\Big|\, \mathcal{F}_{n-1}\right) = \mathbb{E}(C_{n-1}Y_n | \mathcal{F}_{n-1}) + \mathbb{E}\!\left(\sum_{i=1}^{n-1} C_{i-1}Y_i \,\Big|\, \mathcal{F}_{n-1}\right) = C_{n-1}\mathbb{E}(Y_n | \mathcal{F}_{n-1}) + \sum_{i=1}^{n-1} C_{i-1}Y_i = \sum_{i=1}^{n-1} C_{i-1}Y_i.$$

### Connection to the Ito integral

The martingale transform $\sum_{i=1}^n C_{i-1} Y_i$ looks like a **Riemann-Stieltjes sum**: we multiply the process value $C_{i-1}$ by the martingale increment $Y_i$. In continuous time, the analogous object is the **Ito integral** $\int_0^t C_s \, \mathrm{d}W_s$ where $W$ is a Brownian motion.

To make this connection precise: consider a rescaled simple random walk that jumps by $1/\sqrt{N}$ every $1/N$ units of time. As $N \to \infty$, by the Central Limit Theorem, the differences converge to Gaussians, and the walk converges to Brownian motion. The martingale transform converges to the Ito integral. This is a beautiful intuition, but making it rigorous requires substantial technical work.

The key point is that the discrete martingale representation we prove below is a **discrete version** of the continuous-time martingale representation theorem. But the discrete version only works for the simple random walk (or processes with two-valued increments); with three or more values per step, the representation fails.

### The representation theorem

Can every martingale be written as a martingale transform of a reference martingale? In general, **no**. If $Y_1$ takes values in $\{-1, 0, 1\}$ with equal probability, then $X_1$ is $\sigma(Y_1)$-measurable and takes at most 3 values, but $C_0 Y_1$ can only take 3 values $\{-C_0, 0, C_0\}$ which are symmetric about 0. So we can't represent $X_1 = -1$ when $Y_1 = -1$ and $X_1 = 1$ when $Y_1 \in \{0, 1\}$, for instance.

However, for the **simple random walk**, representation always works:

**Theorem 2 (Martingale representation for simple random walk).** Let $(\Omega, \mathcal{F}, \mathbb{P})$ be a probability space; let $(Y_n)_{n \in \mathbb{N}}$ be independent uniform random variables taking values in $\{-1, 1\}$, and let $(\mathcal{F}_n)_{n \geq 0}$ be the natural filtration. Then for every $(\mathcal{F}_n)$-adapted martingale $(X_n)_{n \geq 0}$, there exists a unique $(\mathcal{F}_n)$-adapted process $(C_n)_{n \geq 0}$ such that $X_n = X_0 + \sum_{i=1}^n C_{i-1} Y_i$ for all $n \in \mathbb{N}$.

*Proof.* By induction. Suppose $C_0, \ldots, C_{n-2}$ have been found so that $X_m = X_0 + \sum_{i=1}^m C_{i-1}Y_i$ for $m = 0, \ldots, n-1$. We need to find $C_{n-1}$ that is $\mathcal{F}_{n-1}$-measurable and satisfies $X_n = X_{n-1} + C_{n-1}Y_n$.

Since $\mathcal{F}_n$ is a finite $\sigma$-algebra, consider any minimal non-empty set $F_{n-1} \in \mathcal{F}_{n-1}$. Because $Y_n$ takes only two values $\pm 1$, the set $F_{n-1}$ splits into two parts at time $n$: one where $Y_n = 1$ and one where $Y_n = -1$, each with equal conditional probability.

On $F_{n-1}$, by the martingale property, $\mathbb{E}(X_n | F_{n-1}) = X_{n-1}$. Since $X_n$ takes two values on $F_{n-1}$ (one for each value of $Y_n$), say $X_{n-1}(\omega) + c_{n-1,F_{n-1}}$ and $X_{n-1}(\omega) - c_{n-1,F_{n-1}}$, we set $C_{n-1}(\omega) = c_{n-1,F_{n-1}}$ for $\omega \in F_{n-1}$.

This is the **only** possible choice: if we replaced $C_{n-1}$ by some other $C'_{n-1}$ differing on $F_{n-1}$, then $X_0 + \sum C'_{i-1}Y_i$ would differ from $X_n$ on $F_{n-1}$ (since $Y_n \neq 0$ on this set). $\square$

The uniqueness is crucial: the martingale transform representation captures the **only** way to generate the martingale from the reference process. This is the discrete analogue of the fact that, in continuous time, the Ito representation of a Brownian martingale is unique.

## Key Results

### definition: Martingale transform
**Number:** Definition 1
**Plain English:** A martingale transform multiplies each martingale increment $Y_i$ by a previsible "bet size" $C_{i-1}$, producing a new martingale $\sum C_{i-1}Y_i$.
**Formal:** Given a reference martingale $\sum_{i=1}^n Y_i$ and a process $(C_n)$ adapted to $(\mathcal{F}_n)$, the martingale transform is $\sum_{i=1}^n C_{i-1}Y_i$.
**Load-bearing:** yes

### theorem: Martingale representation for simple random walk
**Number:** Theorem 2
**Plain English:** Every martingale adapted to the simple random walk filtration can be uniquely written as $X_0$ plus a martingale transform of the walk. This fails for increments taking more than 2 values.
**Formal:** If $(Y_n)$ are i.i.d. uniform on $\{-1,1\}$ with natural filtration $(\mathcal{F}_n)$, then for any $(\mathcal{F}_n)$-adapted martingale $(X_n)$, there exists unique $(C_n)$ with $X_n = X_0 + \sum_{i=1}^n C_{i-1}Y_i$.
**Proof sketch:** Induction on $n$. At each step, $Y_n = \pm 1$ gives two equations (martingale property + transform equation) determining $C_{n-1}$ uniquely on each minimal $\mathcal{F}_{n-1}$-set.
**Key technique:** Induction, conditioning on minimal sets of finite $\sigma$-algebras
**Depends on:** Definition 1, conditional expectation properties (Level 15)
**Used by:** Option pricing (Level 24), Ito integral motivation
**Load-bearing:** yes

## Exercises

### exercise: Martingale transform is a martingale
**Number:** Exercise 1
**Difficulty:** standard
**Tags:** martingale-transform, Holder, Lp-spaces, conditional-expectation

**Question:**
Suppose each $Y_i$ is in $L_p(\Omega, \mathcal{F}, \mathbb{P})$, and each $C_i$ is in $L_q(\Omega, \mathcal{F}, \mathbb{P})$, where $1 \leq p, q \leq \infty$ and $\frac{1}{p} + \frac{1}{q} \leq 1$. Suppose $\mathbb{E}(Y_n | \mathcal{F}_{n-1}) = 0$ for all $n \geq 0$. Prove that $\sum_{i=1}^n C_{i-1}Y_i$ is a martingale adapted to $(\mathcal{F}_n)$.

**Hint 1:** Adaptedness and the martingale property
Each $C_{i-1}Y_i$ is $\mathcal{F}_n$-measurable for $i \leq n$ (since $C_{i-1}$ is $\mathcal{F}_{i-1}$-measurable and $Y_i$ is $\mathcal{F}_i$-measurable). For the martingale property: $\mathbb{E}(\sum_{i=1}^n C_{i-1}Y_i | \mathcal{F}_{n-1}) = C_{n-1}\mathbb{E}(Y_n|\mathcal{F}_{n-1}) + \sum_{i=1}^{n-1}C_{i-1}Y_i$.

**Hint 2:** The $L_1$ property
Use Holder's inequality: $\|C_{i-1}Y_i\|_1 \leq \|C_{i-1}\|_q \|Y_i\|_p < \infty$. For the $L_1$ containment of the sum, use triangle inequality and induction.

**Solution:**
**Adaptedness:** The sum $\sum_{i=1}^n C_{i-1}Y_i$ is $\mathcal{F}_n$-measurable since each term $C_{i-1}Y_i$ is a product of $\mathcal{F}_{i-1}$-measurable and $\mathcal{F}_i$-measurable functions, hence $\mathcal{F}_i$-measurable, and $\mathcal{F}_i \subseteq \mathcal{F}_n$ by the filtration property. Finite sums of $\mathcal{F}_n$-measurable functions are $\mathcal{F}_n$-measurable.

**Martingale property:**

$$\mathbb{E}\!\left(\sum_{i=1}^n C_{i-1}Y_i \,\Big|\, \mathcal{F}_{n-1}\right) = \mathbb{E}(C_{n-1}Y_n | \mathcal{F}_{n-1}) + \mathbb{E}\!\left(\sum_{i=1}^{n-1} C_{i-1}Y_i \,\Big|\, \mathcal{F}_{n-1}\right).$$

The first term: $C_{n-1}$ is $\mathcal{F}_{n-1}$-measurable, so by "taking out what is known," $\mathbb{E}(C_{n-1}Y_n|\mathcal{F}_{n-1}) = C_{n-1}\mathbb{E}(Y_n|\mathcal{F}_{n-1}) = 0$. The second term: $\sum_{i=1}^{n-1} C_{i-1}Y_i$ is already $\mathcal{F}_{n-1}$-measurable, so it equals itself. Thus $\mathbb{E}(\sum_{i=1}^n C_{i-1}Y_i | \mathcal{F}_{n-1}) = \sum_{i=1}^{n-1} C_{i-1}Y_i$.

**$L_1$ property:** For $n = 0$, the empty sum is 0 which is trivially in $L_1$. By induction: we need $\|\sum_{i=1}^n C_{i-1}Y_i\|_1 < \infty$. By the triangle inequality, $\|\sum_{i=1}^n C_{i-1}Y_i\|_1 \leq \|\sum_{i=1}^{n-1} C_{i-1}Y_i\|_1 + \|C_{n-1}Y_n\|_1$. By Holder's inequality (since $\frac{1}{p} + \frac{1}{q} \leq 1$, let $p' \leq p$ with $\frac{1}{p'} + \frac{1}{q} = 1$): $\|C_{n-1}Y_n\|_1 \leq \|C_{n-1}\|_q \|Y_n\|_{p'} < \infty$ since $\|Y_n\|_p < \infty$ implies $\|Y_n\|_{p'} < \infty$ by Theorem 11. By induction and $L_q$-containment of $C_{n-1}$ and $L_{p'}$-containment of $Y_n$, the sum is finite. $\square$

### exercise: Generalization of representation theorem
**Number:** Exercise 2
**Difficulty:** challenge
**Tags:** martingale-representation, two-valued, uniqueness

**Question:**
Generalise Theorem 2: prove that we get the same conclusion if $Y_n | F_{n-1}$ is a random variable which takes at most two values and has expectation zero for every minimal non-empty $F_{n-1} \in \mathcal{F}_{n-1}$. If (and only if) $Y_n | F_{n-1}$ takes exactly two distinct values for all minimal non-empty $F_{n-1} \in \mathcal{F}_{n-1}$, for all $n \in \mathbb{N}$, then $(C_n)$ is unique.

**Hint 1:** One-valued case
If $Y_n | F_{n-1}$ takes only one value for some minimal $F_{n-1}$, that value must be 0 (by zero expectation). Then $X_n$ is constant on $F_{n-1}$ (by the martingale property $X_n = X_{n-1}$ on this set), so $C_{n-1}$ can be anything on $F_{n-1}$ — no uniqueness.

**Hint 2:** Two-valued case
If $Y_n | F_{n-1}$ takes values $z_{n-1,F}$ and $z'_{n-1,F}$ with probabilities $p$ and $1-p$, the martingale property forces $X_n|F_{n-1}$ to take two corresponding values. Setting $C_{n-1} = y'_{n-1,F}/z'_{n-1,F}$ (the ratio of the $X$-increment to the $Y$-increment) is the unique solution.

**Solution:**
We proceed by induction exactly as in the proof of Theorem 2. Suppose $C_0, \ldots, C_{n-2}$ are defined so that $X_m = X_0 + \sum_{i=1}^m C_{i-1}Y_i$ for $m \leq n-1$.

**Case 1:** $Y_n|F_{n-1}$ takes only one value for some minimal non-empty $F_{n-1} \in \mathcal{F}_{n-1}$. Since $\mathbb{E}(Y_n|F_{n-1}) = 0$, this value is 0. So $Y_n = 0$ on $F_{n-1}$, and since $X_n$ is a martingale, $X_n|F_{n-1}$ is constant equal to $X_{n-1}$ on this set. Then $X_n = X_{n-1} + C_{n-1} \cdot 0$ holds for **any** value of $C_{n-1}$ on $F_{n-1}$. We can choose $C_{n-1} = 0$ on this set.

**Case 2:** $Y_n|F_{n-1}$ takes exactly two distinct values $z_{n-1,F}$ and $z'_{n-1,F}$ with non-zero probabilities $p$ and $1-p$. The condition $pz + (1-p)z' = 0$ holds (zero conditional expectation), so $z$ and $z'$ have opposite signs. The conditioned $X_n$ takes values $x + y'$ (when $Y_n = z$) and $x - y'p/(1-p)$ (when $Y_n = z'$), where $x = X_{n-1}(\omega)$ on $F_{n-1}$.

We need $C_{n-1}$ such that $X_n - X_{n-1} = C_{n-1}Y_n$ on $F_{n-1}$. Define $C_{n-1}(\omega) = y_{n-1,F}/z_{n-1,F}$ where $y_{n-1,F}$ is the $X$-increment corresponding to $Y_n = z_{n-1,F}$. Since $Y_n \neq 0$ on $F_{n-1}$, this is the unique solution: replacing $C_{n-1}$ by any $C'_{n-1} \neq C_{n-1}$ on $F_{n-1}$ would give a different sum $X_0 + \sum C'_{i-1}Y_i \neq X_n$ (since $Y_n \neq 0$ on $F_{n-1}$). $\square$
