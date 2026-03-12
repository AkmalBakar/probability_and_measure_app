---
level: 9
title: "Expectation, Inequalities & Independence"
notes: 2
prerequisites: [8]
---

# Level 9: Expectation, Inequalities & Independence

## Reading

We have spent several levels building the Lebesgue integral from the ground up: simple functions, monotone convergence, Fatou's lemma, dominated convergence. Now we cash in that investment. The punchline is simple: **expectation IS the Lebesgue integral**. Everything we proved about integrals translates directly into the language of probability.

### Expectation, moments, and variance

Let $(\Omega, \mathcal{F}, \mathbb{P})$ be a probability space and $X : \Omega \to \mathbb{R}^{\pm\infty}$ a random variable. The **expectation** of $X$ is simply its Lebesgue integral against $\mathbb{P}$:

$$\mathbb{E}(X) = \int_\Omega X \, \mathrm{d}\mathbb{P}.$$

This exists (as a value in $\mathbb{R}^{\pm\infty}$) whenever $X$ is measurable. The first moment of $X$ is just $\mathbb{E}(X)$ itself. For any $s \in \mathbb{R}$, the **$s$-th moment** is $\mathbb{E}(X^s)$, though we are usually interested in $s \in \mathbb{N}$.

The **$s$-th centred moment** is $\mathbb{E}\bigl((X - \mathbb{E}(X))^s\bigr)$. The most important centred moment is the second one: the **variance**

$$\operatorname{Var}(X) = \mathbb{E}\bigl((X - \mathbb{E}(X))^2\bigr).$$

Centred moments are considered undefined if $\mathbb{E}(X) \notin \mathbb{R}$ (i.e., if the expectation is $+\infty$, $-\infty$, or does not exist). Notice that the variance is always non-negative, since it is the expectation of a non-negative random variable. The standard computational shortcut $\operatorname{Var}(X) = \mathbb{E}(X^2) - (\mathbb{E}(X))^2$ follows from linearity of expectation (which we will establish shortly).

<details>
<summary>Formal Statement (Definition 18)</summary>

**Definition 18 (Expectation, moments, variance).** Let $X : \Omega \to \mathbb{R}^{\pm\infty}$ be a random variable on $(\Omega, \mathcal{F}, \mathbb{P})$. The expectation is $\mathbb{E}(X) = \int_\Omega X \, \mathrm{d}\mathbb{P}$. The $s$-th moment is $\mathbb{E}(X^s)$. The variance is $\operatorname{Var}(X) = \mathbb{E}((X - \mathbb{E}(X))^2)$.

</details>

### Markov's and Chebyshev's inequalities

These two inequalities convert information about moments into information about tail probabilities. They are blunt instruments -- the bounds are often far from tight -- but they are universally applicable.

**Markov's inequality** says: if $X \geq 0$ and $\mathbb{E}(X) < \infty$, then for any $t > 0$,

$$\mathbb{P}(X \geq t) \leq \frac{\mathbb{E}(X)}{t}.$$

The intuition is immediate: if a non-negative random variable has small expectation, it cannot be large with high probability. The proof is a one-liner using indicators. Let $A = \{\omega : X(\omega) \geq t\}$. Then $X \geq t \cdot \mathbf{1}_A$ pointwise, so integrating both sides gives $\mathbb{E}(X) \geq t \, \mathbb{P}(A)$, and rearranging yields the result. This is Exercise 14 below.

<details>
<summary>Formal Statement & Proof (Theorem 19 — Markov's Inequality)</summary>

**Theorem 19 (Markov's Inequality).** Let $X \geq 0$ with $\mathbb{E}(X) < \infty$. For any $t > 0$: $\mathbb{P}(X \geq t) \leq \frac{\mathbb{E}(X)}{t}$.

**Proof.** Let $A = \{\omega : X(\omega) \geq t\}$. Then $X \geq t \cdot \mathbf{1}_A$ pointwise (on $A$, $X \geq t$; off $A$, $t \cdot \mathbf{1}_A = 0 \leq X$). Integrating: $\mathbb{E}(X) \geq t \, \mathbb{P}(A) = t \, \mathbb{P}(X \geq t)$. Divide by $t$. $\square$

</details>

**Chebyshev's inequality** applies Markov to the centred square $(X - \mathbb{E}(X))^2$:

$$\mathbb{P}\bigl(|X - \mathbb{E}(X)| \geq t\bigr) \leq \frac{\operatorname{Var}(X)}{t^2}.$$

The proof is short and instructive. The event $\{|X - \mathbb{E}(X)| \geq t\}$ is the same as $\{(X - \mathbb{E}(X))^2 \geq t^2\}$. The random variable $(X - \mathbb{E}(X))^2$ is non-negative with expectation $\operatorname{Var}(X) < \infty$, so Markov's inequality gives $\mathbb{P}((X - \mathbb{E}(X))^2 \geq t^2) \leq \operatorname{Var}(X)/t^2$.

<details>
<summary>Formal Statement & Proof (Theorem 20 — Chebyshev's Inequality)</summary>

**Theorem 20 (Chebyshev's Inequality).** Let $X$ be a random variable with $\operatorname{Var}(X) < \infty$. For any $t > 0$: $\mathbb{P}(|X - \mathbb{E}(X)| \geq t) \leq \frac{\operatorname{Var}(X)}{t^2}$.

**Proof.** The event $\{|X - \mathbb{E}(X)| \geq t\}$ equals $\{(X - \mathbb{E}(X))^2 \geq t^2\}$. Apply Markov's inequality to the non-negative random variable $(X - \mathbb{E}(X))^2$ with threshold $t^2$: $\mathbb{P}((X - \mathbb{E}(X))^2 \geq t^2) \leq \frac{\mathbb{E}((X - \mathbb{E}(X))^2)}{t^2} = \frac{\operatorname{Var}(X)}{t^2}$. $\square$

</details>

Control of the expectation (first moment) tells us $X$ is unlikely to be *big*. Control of the variance (second centred moment) tells us $X$ is unlikely to be *far from its mean*. The same idea extends to higher moments: applying Markov to $|X - \mathbb{E}(X)|^k$ with threshold $t^k$ gives $\mathbb{P}(|X - \mathbb{E}(X)| \geq t) \leq \mathbb{E}(|X - \mathbb{E}(X)|^k)/t^k$, though one must be careful with odd moments because of cancellation.

### Independence

We already saw independence of events in Level 1. Now we extend it to $\sigma$-algebras and random variables.

A finite collection of sub-$\sigma$-algebras $\mathcal{G}_1, \ldots, \mathcal{G}_n \subseteq \mathcal{F}$ are **independent** if for any choice of events $G_1 \in \mathcal{G}_1, \ldots, G_n \in \mathcal{G}_n$, the events $G_1, \ldots, G_n$ are independent:

$$\mathbb{P}(G_1 \cap \cdots \cap G_n) = \mathbb{P}(G_1) \cdots \mathbb{P}(G_n).$$

Random variables $X_1, \ldots, X_n$ are **independent** if their generated $\sigma$-algebras $\sigma(X_1), \ldots, \sigma(X_n)$ are independent.

An *infinite* collection of $\sigma$-algebras (or random variables) is independent if every finite sub-collection is independent.

<details>
<summary>Formal Statement (Definition 21)</summary>

**Definition 21 (Independence).** $\sigma$-algebras $\mathcal{G}_1, \ldots, \mathcal{G}_n \subseteq \mathcal{F}$ are independent if for any $G_i \in \mathcal{G}_i$: $\mathbb{P}(G_1 \cap \cdots \cap G_n) = \prod_{i=1}^n \mathbb{P}(G_i)$. Random variables $X_1, \ldots, X_n$ are independent if $\sigma(X_1), \ldots, \sigma(X_n)$ are independent. An infinite collection is independent if every finite sub-collection is.

</details>

It is important to note that **independence is a property of the probability measure $\mathbb{P}$**, not just of the $\sigma$-algebras themselves. The same pair of events can be independent under one measure and dependent under another. To see why, consider a sample space $\Omega = \{a, b, c, d\}$ with $\mathcal{F} = 2^\Omega$, and events $A = \{a, b\}$, $B = \{a, c\}$. Under the uniform measure, $\mathbb{P}(A \cap B) = 1/4 = \mathbb{P}(A)\mathbb{P}(B)$, so $A$ and $B$ are independent. But under the measure $\mathbb{P}(\{a\}) = 1/2$, $\mathbb{P}(\{b\}) = \mathbb{P}(\{c\}) = \mathbb{P}(\{d\}) = 1/6$, we get $\mathbb{P}(A) = 2/3$, $\mathbb{P}(B) = 2/3$, $\mathbb{P}(A \cap B) = 1/2 \neq 4/9$, so $A$ and $B$ are dependent.

### Properties of expectation

With integration theory and independence in hand, we can state the key algebraic properties of expectation.

**Linearity:** For any random variables $X, Y$ with $\mathbb{E}(|X|), \mathbb{E}(|Y|) < \infty$ and any $\alpha, \beta \in \mathbb{R}$:

$$\mathbb{E}(\alpha X + \beta Y) = \alpha \mathbb{E}(X) + \beta \mathbb{E}(Y).$$

This is a direct consequence of linearity of the Lebesgue integral. Note: we require $\mathbb{E}(|X|), \mathbb{E}(|Y|) < \infty$ to avoid the undefined expression $\infty - \infty$.

**Multiplicativity for independent variables:** If $X$ and $Y$ are independent and $\mathbb{E}(|X|), \mathbb{E}(|Y|) < \infty$, then

$$\mathbb{E}(XY) = \mathbb{E}(X)\mathbb{E}(Y).$$

This does *not* follow from linearity -- it is a genuinely new property that depends on independence. The proof strategy (Exercise 15) proceeds in stages:

1. **Non-negative simple functions.** Write $f_n = \sum_i \alpha_i \mathbf{1}_{A_i}$ and $g_n = \sum_j \beta_j \mathbf{1}_{B_j}$, where $A_i \in \sigma(X)$ and $B_j \in \sigma(Y)$. Then $f_n g_n = \sum_{i,j} \alpha_i \beta_j \mathbf{1}_{A_i \cap B_j}$. Independence gives $\mathbb{P}(A_i \cap B_j) = \mathbb{P}(A_i)\mathbb{P}(B_j)$, so $\int f_n g_n \, \mathrm{d}\mathbb{P} = \int f_n \, \mathrm{d}\mathbb{P} \cdot \int g_n \, \mathrm{d}\mathbb{P}$.

2. **Non-negative case.** Let $f_n \nearrow X$ and $g_n \nearrow Y$ be monotone increasing sequences of simple functions (from Exercise 4). Then $f_n g_n \nearrow XY$, and the MCT gives $\mathbb{E}(XY) = \lim \mathbb{E}(f_n g_n) = \lim \mathbb{E}(f_n)\mathbb{E}(g_n) = \mathbb{E}(X)\mathbb{E}(Y)$.

3. **General case.** Write $X = X^+ - X^-$, $Y = Y^+ - Y^-$. The non-negative case first establishes $\mathbb{E}(|X||Y|) = \mathbb{E}(|X|)\mathbb{E}(|Y|) < \infty$, so $XY$ is integrable. Then approximate $X$ by simple functions $f_n$ with $|f_n| \leq |X|$ and use the DCT (with dominator $|X||Y|$) to conclude.

<details>
<summary>Formal Statement & Proof (Theorem 22 — Properties of Expectation)</summary>

**Theorem 22.** Let $X, Y$ be random variables with $\mathbb{E}(|X|), \mathbb{E}(|Y|) < \infty$. Then:
- **Linearity:** $\mathbb{E}(\alpha X + \beta Y) = \alpha \mathbb{E}(X) + \beta \mathbb{E}(Y)$ for any $\alpha, \beta \in \mathbb{R}$.
- **Multiplicativity (if independent):** If $X, Y$ are independent, $\mathbb{E}(XY) = \mathbb{E}(X)\mathbb{E}(Y)$.

**Proof.**

*Linearity* follows directly from linearity of the Lebesgue integral.

*Multiplicativity:*
1. **Step 1 — Non-negative simple case.** Let $f = \sum_i \alpha_i \mathbf{1}_{A_i}$ and $g = \sum_j \beta_j \mathbf{1}_{B_j}$ be $\sigma(X)$- and $\sigma(Y)$-measurable simple functions. Then $fg = \sum_{i,j} \alpha_i \beta_j \mathbf{1}_{A_i \cap B_j}$. By independence, $\mathbb{P}(A_i \cap B_j) = \mathbb{P}(A_i)\mathbb{P}(B_j)$, so $\mathbb{E}(fg) = \sum_{i,j} \alpha_i \beta_j \mathbb{P}(A_i)\mathbb{P}(B_j) = \mathbb{E}(f)\mathbb{E}(g)$.
2. **Step 2 — Non-negative case.** Let $f_n \nearrow X$, $g_n \nearrow Y$ be simple approximations. Then $f_n g_n \nearrow XY$, and MCT gives $\mathbb{E}(XY) = \lim \mathbb{E}(f_n g_n) = \lim \mathbb{E}(f_n)\mathbb{E}(g_n) = \mathbb{E}(X)\mathbb{E}(Y)$.
3. **Step 3 — General case.** First, $\mathbb{E}(|X||Y|) = \mathbb{E}(|X|)\mathbb{E}(|Y|) < \infty$ (non-negative case), so $XY$ is integrable. Approximate $X$ by simple $f_n$ with $|f_n| \leq |X|$. Then $|f_n Y| \leq |X||Y|$ is integrable, so DCT gives $\mathbb{E}(XY) = \lim \mathbb{E}(f_n Y) = \lim \mathbb{E}(f_n)\mathbb{E}(Y) = \mathbb{E}(X)\mathbb{E}(Y)$.

$\square$

</details>

### Jensen's inequality

Let $f$ be a convex function on an interval $I$, and let $X$ be a random variable taking values in $I$ with $\mathbb{E}(|X|) < \infty$. Then:

$$\mathbb{E}\bigl(f(X)\bigr) \geq f\bigl(\mathbb{E}(X)\bigr).$$

This is **Jensen's inequality**. The proof uses the existence of a *subgradient*: at any point $x_0$ in the interior of $I$, convexity guarantees there exists $c \in \mathbb{R}$ such that

$$f(x) \geq f(x_0) + c(x - x_0) \quad \text{for all } x \in I.$$

Setting $x_0 = \mathbb{E}(X)$ and substituting $x = X(\omega)$, we get $f(X) \geq f(\mathbb{E}(X)) + c(X - \mathbb{E}(X))$ pointwise. Taking expectations of both sides:

$$\mathbb{E}\bigl(f(X)\bigr) \geq f(\mathbb{E}(X)) + c\bigl(\mathbb{E}(X) - \mathbb{E}(X)\bigr) = f(\mathbb{E}(X)).$$

There is also a **reverse Jensen inequality**: if $X$ takes values in $[a, b]$ and $\mathbb{E}(X) = \alpha a + (1-\alpha)b$ for some $\alpha \in [0,1]$, then

$$\mathbb{E}\bigl(f(X)\bigr) \leq \alpha f(a) + (1-\alpha) f(b).$$

The proof uses the geometric characterization of convexity. For any $x \in [a, b]$, we can write $x = \frac{b-x}{b-a} a + \frac{x-a}{b-a} b$, and convexity gives $f(x) \leq \frac{b-x}{b-a} f(a) + \frac{x-a}{b-a} f(b)$. This is a linear (hence measurable) upper bound on $f(X)$. Taking expectations and using $\mathbb{E}(X) = \alpha a + (1-\alpha)b$ yields the result.

Jensen gives many classical inequalities as special cases: taking $f(x) = x^2$ yields $\mathbb{E}(X^2) \geq (\mathbb{E}(X))^2$ (i.e., variance is non-negative); taking $f(x) = -\log x$ yields the AM-GM inequality; taking $f(x) = |x|^p$ for $p \geq 1$ yields $(\mathbb{E}|X|)^p \leq \mathbb{E}(|X|^p)$.

<details>
<summary>Formal Statement & Proof (Theorem 23 — Jensen's Inequality)</summary>

**Theorem 23 (Jensen's Inequality).** Let $X$ be a real-valued random variable with $\mathbb{E}(|X|) < \infty$, and let $f$ be convex on an interval containing the range of $X$. Then $\mathbb{E}(f(X)) \geq f(\mathbb{E}(X))$.

**Proof.** At $x_0 = \mathbb{E}(X)$, convexity guarantees the existence of a subgradient $c \in \mathbb{R}$ such that $f(x) \geq f(x_0) + c(x - x_0)$ for all $x$ in the domain. Substituting $x = X(\omega)$: $f(X(\omega)) \geq f(\mathbb{E}(X)) + c(X(\omega) - \mathbb{E}(X))$ for all $\omega$. Taking expectations of both sides: $\mathbb{E}(f(X)) \geq f(\mathbb{E}(X)) + c(\mathbb{E}(X) - \mathbb{E}(X)) = f(\mathbb{E}(X))$. $\square$

</details>

### Law of the Unconscious Statistician (LOTUS)

Suppose $X$ has a density $f$ (i.e., $F(x) = \mathbb{P}(X \leq x) = \int_{-\infty}^x f(y) \, \mathrm{d}y$). If we want $\mathbb{E}(g(X))$ for some measurable $g$, the naive approach would be to first find the distribution of $g(X)$ and then integrate. LOTUS says we can skip that step:

$$\mathbb{E}\bigl(g(X)\bigr) = \int_{-\infty}^{\infty} g(x) f(x) \, \mathrm{d}x.$$

The name is tongue-in-cheek: undergraduates use this formula instinctively ("unconsciously"), and it looks like it should be the definition rather than a theorem. But it does require proof -- the left side is an integral over $\Omega$ with respect to $\mathbb{P}$, while the right side is an integral over $\mathbb{R}$ with respect to Lebesgue measure weighted by the density.

The proof (non-examinable but instructive) approximates $g$ by simple functions, uses the MCT, and crucially relies on the identity $\mathbb{P}(X^{-1}(A)) = \int_A f(x) \, \mathrm{d}x$ for bounded Borel sets $A$. This identity is established using continuity of measure and the Caratheodory extension: it holds for intervals by definition of the CDF, extends to finite unions of intervals, and then to all Borel sets.

<details>
<summary>Formal Statement (Theorem 24 — LOTUS)</summary>

**Theorem 24 (LOTUS).** Let $X$ have density $f$. For any measurable $g : \mathbb{R} \to \mathbb{R}$: $\mathbb{E}(g(X)) = \int_{-\infty}^{\infty} g(x) f(x) \, \mathrm{d}x$, provided the integrals exist.

</details>

## Key Results

### definition: Expectation, moments, variance
**Number:** Definition 18
**Plain English:** Expectation is the Lebesgue integral of a random variable against the probability measure. Moments measure "how spread out" the distribution is; the variance is the second centred moment.
**Formal:** Let $X : \Omega \to \mathbb{R}^{\pm\infty}$ be a random variable on $(\Omega, \mathcal{F}, \mathbb{P})$. The expectation is $\mathbb{E}(X) = \int_\Omega X \, \mathrm{d}\mathbb{P}$. The $s$-th moment is $\mathbb{E}(X^s)$. The $s$-th centred moment is $\mathbb{E}\bigl((X - \mathbb{E}(X))^s\bigr)$. The variance is $\operatorname{Var}(X) = \mathbb{E}\bigl((X - \mathbb{E}(X))^2\bigr)$.
**Key technique:** Lebesgue integration
**Load-bearing:** yes

### theorem: Markov's inequality
**Number:** Theorem 19
**Plain English:** A non-negative random variable with small expectation cannot be large with high probability. The tail probability decays at most inversely with the threshold.
**Formal:** Let $X \geq 0$ be a non-negative random variable with $\mathbb{E}(X) < \infty$. Then for any $t > 0$:
$$\mathbb{P}(X \geq t) \leq \frac{\mathbb{E}(X)}{t}.$$
**Proof:** Let $A = \{X \geq t\}$. Then $X \geq t \cdot \mathbf{1}_A$ pointwise. Integrate: $\mathbb{E}(X) \geq t\,\mathbb{P}(A)$. Divide by $t > 0$. $\square$
**Key technique:** Indicator bounding
**Load-bearing:** yes

### theorem: Chebyshev's inequality
**Number:** Theorem 20
**Plain English:** A random variable with small variance is unlikely to be far from its mean. The tail probability decays at most inversely with the square of the threshold.
**Formal:** Let $X$ be a random variable with $\operatorname{Var}(X) < \infty$. Then for any $t > 0$:
$$\mathbb{P}\bigl(|X - \mathbb{E}(X)| \geq t\bigr) \leq \frac{\operatorname{Var}(X)}{t^2}.$$
**Proof:** $\{|X - \mathbb{E}(X)| \geq t\} = \{(X - \mathbb{E}(X))^2 \geq t^2\}$. Apply Markov to the non-negative r.v. $(X - \mathbb{E}(X))^2$ with threshold $t^2$: $\mathbb{P}((X - \mathbb{E}(X))^2 \geq t^2) \leq \operatorname{Var}(X)/t^2$. $\square$
**Key technique:** Reduce to Markov's inequality
**Load-bearing:** yes

### definition: Independence of sigma-algebras and random variables
**Number:** Definition 21
**Plain English:** Sub-sigma-algebras are independent if knowing an event from one gives no information about events from the others; random variables are independent if their generated sigma-algebras are.
**Formal:** $\sigma$-algebras $\mathcal{G}_1, \ldots, \mathcal{G}_n \subseteq \mathcal{F}$ are independent if for any $G_i \in \mathcal{G}_i$, $\mathbb{P}(G_1 \cap \cdots \cap G_n) = \prod_{i=1}^n \mathbb{P}(G_i)$. Random variables $X_1, \ldots, X_n$ are independent if $\sigma(X_1), \ldots, \sigma(X_n)$ are independent. An infinite collection is independent if every finite sub-collection is.
**Key technique:** Factorization of joint probabilities
**Load-bearing:** yes

### theorem: Properties of expectation (linearity and multiplicativity)
**Number:** Theorem 22
**Plain English:** Expectation is linear regardless of dependence; for independent random variables, expectation also respects multiplication.
**Formal:** Let $X, Y$ be random variables on $(\Omega, \mathcal{F}, \mathbb{P})$ with $\mathbb{E}(|X|), \mathbb{E}(|Y|) < \infty$. Then for any $\alpha, \beta \in \mathbb{R}$: $\mathbb{E}(\alpha X + \beta Y) = \alpha \mathbb{E}(X) + \beta \mathbb{E}(Y)$. If additionally $X$ and $Y$ are independent: $\mathbb{E}(XY) = \mathbb{E}(X)\mathbb{E}(Y)$.
**Proof:** Linearity follows from linearity of the Lebesgue integral. Multiplicativity: for non-negative simple $f = \sum_i \alpha_i \mathbf{1}_{A_i}$ ($A_i \in \sigma(X)$) and $g = \sum_j \beta_j \mathbf{1}_{B_j}$ ($B_j \in \sigma(Y)$), independence gives $\mathbb{P}(A_i \cap B_j) = \mathbb{P}(A_i)\mathbb{P}(B_j)$, so $\mathbb{E}(fg) = \mathbb{E}(f)\mathbb{E}(g)$. For non-negative $X, Y$: approximate by simple $f_n \nearrow X$, $g_n \nearrow Y$, then MCT gives $\mathbb{E}(XY) = \lim \mathbb{E}(f_n g_n) = \mathbb{E}(X)\mathbb{E}(Y)$. General case: $\mathbb{E}(|X||Y|) = \mathbb{E}(|X|)\mathbb{E}(|Y|) < \infty$, then approximate $X$ by simple $f_n$ with $|f_n| \leq |X|$ and apply DCT. $\square$
**Key technique:** Independence + approximation by simple functions
**Load-bearing:** yes

### theorem: Jensen's inequality
**Number:** Theorem 23
**Plain English:** Applying a convex function to a random variable and then taking expectation gives at least as much as taking expectation first and then applying the function. There is also a reverse bound when the range is bounded.
**Formal:** Let $X$ be a real-valued random variable and $f$ a convex function whose domain contains the range of $X$. Then $\mathbb{E}\bigl(f(X)\bigr) \geq f\bigl(\mathbb{E}(X)\bigr)$. If the range of $X$ is in $[a,b]$ and $\mathbb{E}(X) = \alpha a + (1-\alpha)b$, then $\mathbb{E}\bigl(f(X)\bigr) \leq \alpha f(a) + (1-\alpha)f(b)$.
**Proof:** At $x_0 = \mathbb{E}(X)$, convexity guarantees a subgradient $c$ with $f(x) \geq f(x_0) + c(x - x_0)$ for all $x$. Substitute $x = X(\omega)$: $f(X) \geq f(\mathbb{E}(X)) + c(X - \mathbb{E}(X))$ pointwise. Take expectations: $\mathbb{E}(f(X)) \geq f(\mathbb{E}(X)) + c(\mathbb{E}(X) - \mathbb{E}(X)) = f(\mathbb{E}(X))$. $\square$
**Key technique:** Subgradient existence for convex functions
**Load-bearing:** yes

### theorem: Law of the Unconscious Statistician (LOTUS)
**Number:** Theorem 24
**Plain English:** To compute $\mathbb{E}(g(X))$ when $X$ has a density $f$, integrate $g(x)f(x)$ over $\mathbb{R}$ -- no need to find the distribution of $g(X)$ first.
**Formal:** Let $X$ be a real-valued random variable with distribution function $F(x) = \mathbb{P}(X \leq x)$, and suppose there exists a density $f : \mathbb{R} \to \mathbb{R}_{\geq 0}$ with $F(x) = \int_{-\infty}^x f(y) \, \mathrm{d}y$. Then for any measurable $g : \mathbb{R} \to \mathbb{R}$:
$$\mathbb{E}\bigl(g(X)\bigr) = \int_{-\infty}^{\infty} g(x) f(x) \, \mathrm{d}x,$$
provided the integrals exist.
**Proof:** For non-negative $g$: approximate by simple $g_n = \sum_i \alpha_i \mathbf{1}_{A_i} \nearrow g$. Then $\mathbb{E}(g_n(X)) = \sum_i \alpha_i \mathbb{P}(X \in A_i) = \sum_i \alpha_i \int_{A_i} f(x) \, \mathrm{d}x = \int g_n(x) f(x) \, \mathrm{d}x$. By MCT, $\mathbb{E}(g(X)) = \lim \mathbb{E}(g_n(X)) = \int g(x)f(x) \, \mathrm{d}x$. General $g$: split $g = g^+ - g^-$. $\square$
**Key technique:** Simple function approximation + MCT + Borel set identity
**Load-bearing:** no

## Exercises

### exercise: Riemann integrable implies Lebesgue measurable
**Number:** Exercise 12
**Difficulty:** standard
**Tags:** Riemann, Lebesgue, measurability, Darboux

**Question:**
Prove that if $f : [a,b] \to \mathbb{R}$ is Riemann integrable with finite integral, then $f$ is measurable with respect to the Lebesgue measure $\lambda$ on $[a,b]$.

**Hint 1:** Use Darboux lower and upper functions
For a sequence of partitions $P_k$ witnessing the Riemann integral (with $P_{k+1}$ refining $P_k$), define $L(P_k, f)$ as the step function taking value $\inf_I f$ on each interval $I \in P_k$, and similarly $U(P_k, f)$ taking value $\sup_I f$. Let $L(f) = \lim_k L(P_k, f)$ and $U(f) = \lim_k U(P_k, f)$. These limits exist because the lower functions increase and the upper functions decrease under refinement.

**Hint 2:** Show $L(f) = f = U(f)$ almost everywhere
Since $L(f) \leq f \leq U(f)$ and $\int L(f) = \int U(f)$ (by Riemann integrability, both equal the Riemann integral), we have $\int(U(f) - L(f)) = 0$. By Exercise 7 (integral zero iff zero a.s.), $U(f) - L(f) = 0$ a.e. So $f = L(f)$ a.e., and $L(f)$ is measurable as a pointwise limit of step functions. Measurability of $f$ then follows from completeness of Lebesgue measure.

**Solution:**
Let $P_k$ be a sequence of partitions of $[a,b]$ such that $P_{k+1}$ refines $P_k$ and the mesh $|P_k| \to 0$. Define step functions $L(P_k, f)$ and $U(P_k, f)$ on each interval $I \in P_k$ by the infimum and supremum of $f$ on $I$.

The sequence $L(P_k, f)$ is pointwise increasing (refinement can only increase the infimum on subintervals) and bounded above by $f$. The sequence $U(P_k, f)$ is pointwise decreasing and bounded below by $f$. Define $L(f) = \lim_k L(P_k, f)$ and $U(f) = \lim_k U(P_k, f)$. These are measurable as pointwise limits of step functions (which are simple functions).

We have $L(f) \leq f \leq U(f)$ pointwise. Step functions are both Riemann and Lebesgue integrable with the same value, so by monotonicity of the Lebesgue integral:

$$\int_{[a,b]} L(P_k, f) \, \mathrm{d}\lambda \leq \int_{[a,b]} L(f) \, \mathrm{d}\lambda \leq \int_{[a,b]} U(f) \, \mathrm{d}\lambda \leq \int_{[a,b]} U(P_k, f) \, \mathrm{d}\lambda.$$

As $k \to \infty$, the left side converges to the lower Darboux integral and the right side to the upper Darboux integral. Since $f$ is Riemann integrable, these are equal (both equal the Riemann integral of $f$). Therefore $\int L(f) \, \mathrm{d}\lambda = \int U(f) \, \mathrm{d}\lambda$.

Since $U(f) - L(f) \geq 0$ and $\int(U(f) - L(f)) \, \mathrm{d}\lambda = 0$, Exercise 7 gives $U(f) = L(f)$ $\lambda$-almost everywhere. Since $L(f) \leq f \leq U(f)$, we have $f = L(f) = U(f)$ $\lambda$-a.e.

For measurability: $L(f)$ is measurable (pointwise limit of measurable functions). The set $N = \{\omega : f(\omega) \neq L(f)(\omega)\}$ has $\lambda(N) = 0$. For any Borel set $B$, we have $f^{-1}(B) = \bigl(L(f)^{-1}(B) \setminus N'\bigr) \cup N''$ where $N', N'' \subseteq N$. By completeness of Lebesgue measure, subsets of null sets are measurable, so $f^{-1}(B)$ is Lebesgue measurable.

### exercise: Prove Markov's inequality
**Number:** Exercise 14
**Difficulty:** warm-up
**Tags:** inequality, expectation, indicator-functions

**Question:**
Let $X$ be a non-negative random variable with $\mathbb{E}(X) < \infty$. Prove that for any $t > 0$:
$$\mathbb{P}(X \geq t) \leq \frac{\mathbb{E}(X)}{t}.$$
*Hint: consider $A = \{\omega : X(\omega) \geq t\}$.*

**Hint 1:** Bound $X$ below using an indicator
Consider the set $A = \{\omega : X(\omega) \geq t\}$. This is measurable (it is the inverse image of $[t, \infty)$ under the random variable $X$). What can you say about $X$ compared to $t \cdot \mathbf{1}_A$?

**Hint 2:** Integrate the bound and rearrange
Since $X \geq 0$ and $X(\omega) \geq t$ on $A$, we have $X \geq t \cdot \mathbf{1}_A$ everywhere. Integrate both sides using monotonicity of the integral, and recall that $\int \mathbf{1}_A \, \mathrm{d}\mathbb{P} = \mathbb{P}(A)$.

**Solution:**
Let $A = \{\omega : X(\omega) \geq t\}$, which is measurable since $X$ is a random variable (it is $X^{-1}([t, \infty))$).

Since $X \geq 0$, we have $X(\omega) \geq t \cdot \mathbf{1}_A(\omega)$ for all $\omega \in \Omega$: if $\omega \in A$ then $X(\omega) \geq t = t \cdot \mathbf{1}_A(\omega)$, and if $\omega \notin A$ then $t \cdot \mathbf{1}_A(\omega) = 0 \leq X(\omega)$.

By monotonicity of the integral:

$$\mathbb{E}(X) = \int_\Omega X \, \mathrm{d}\mathbb{P} \geq \int_\Omega t \cdot \mathbf{1}_A \, \mathrm{d}\mathbb{P} = t \, \mathbb{P}(A) = t \, \mathbb{P}(X \geq t).$$

Dividing both sides by $t > 0$ gives $\mathbb{P}(X \geq t) \leq \frac{\mathbb{E}(X)}{t}$.

### exercise: Multiplicativity of expectation for independent random variables
**Number:** Exercise 15
**Difficulty:** standard
**Tags:** independence, expectation, MCT, DCT, simple-functions

**Question:**
Prove that if $X$ and $Y$ are independent random variables with $\mathbb{E}(|X|), \mathbb{E}(|Y|) < \infty$, then $\mathbb{E}(XY) = \mathbb{E}(X)\mathbb{E}(Y)$.

*Hint: first consider the case that $X$ and $Y$ are non-negative, using simple function approximation and the Monotone Convergence Theorem. Then use this case together with the Dominated Convergence Theorem to handle the general case.*

**Hint 1:** Start with non-negative simple functions
Suppose first that $X, Y \geq 0$ with $\mathbb{E}(X), \mathbb{E}(Y) < \infty$. Let $f_n$ and $g_n$ be monotone increasing sequences of $\sigma(X)$-measurable and $\sigma(Y)$-measurable simple functions converging to $X$ and $Y$ respectively (from Exercise 4). Show that $\int f_n g_n \, \mathrm{d}\mathbb{P} = \int f_n \, \mathrm{d}\mathbb{P} \cdot \int g_n \, \mathrm{d}\mathbb{P}$ by expanding the simple functions and using the independence identity $\mathbb{P}(A_i \cap B_j) = \mathbb{P}(A_i)\mathbb{P}(B_j)$.

**Hint 2:** Extend from non-negative to general using DCT
For general $X, Y$: write $X = X^+ - X^-$ and $Y = Y^+ - Y^-$. The non-negative case gives $\mathbb{E}(X^+ Y^+) = \mathbb{E}(X^+)\mathbb{E}(Y^+)$ and similarly for the other three combinations. For the general case, approximate $X$ by simple functions $f_n$ with $|f_n| \leq |X|$. Since $|f_n Y| \leq |X||Y|$ and $\mathbb{E}(|X||Y|) = \mathbb{E}(|X|)\mathbb{E}(|Y|) < \infty$ (by the non-negative case), apply the DCT.

**Solution:**
**Step 1: Non-negative case.** Suppose $X, Y \geq 0$ with $\mathbb{E}(X), \mathbb{E}(Y) < \infty$. Let $f_1 \leq f_2 \leq \cdots$ be $\sigma(X)$-measurable non-negative simple functions with $f_n \to X$ pointwise, and similarly $g_1 \leq g_2 \leq \cdots$ with $g_n \to Y$. Then $f_n g_n$ is a monotone increasing sequence of simple functions converging to $XY$.

Write $f_n = \sum_i \alpha_i \mathbf{1}_{A_i}$ and $g_n = \sum_j \beta_j \mathbf{1}_{B_j}$, so $f_n g_n = \sum_{i,j} \alpha_i \beta_j \mathbf{1}_{A_i \cap B_j}$.

Since $A_i \in \sigma(X)$ and $B_j \in \sigma(Y)$, and these $\sigma$-algebras are independent, we have $\mathbb{P}(A_i \cap B_j) = \mathbb{P}(A_i)\mathbb{P}(B_j)$. Therefore:

$$\int f_n g_n \, \mathrm{d}\mathbb{P} = \sum_{i,j} \alpha_i \beta_j \mathbb{P}(A_i)\mathbb{P}(B_j) = \left(\sum_i \alpha_i \mathbb{P}(A_i)\right)\left(\sum_j \beta_j \mathbb{P}(B_j)\right) = \int f_n \, \mathrm{d}\mathbb{P} \cdot \int g_n \, \mathrm{d}\mathbb{P}.$$

By the Monotone Convergence Theorem (applied to all three sequences), taking $n \to \infty$:

$$\mathbb{E}(XY) = \mathbb{E}(X) \cdot \mathbb{E}(Y).$$

**Step 2: General case.** For general $X, Y$ with $\mathbb{E}(|X|), \mathbb{E}(|Y|) < \infty$, decompose $X = X^+ - X^-$ and similarly for $Y$. By the non-negative case, $\mathbb{E}(|X||Y|) = \mathbb{E}(|X|)\mathbb{E}(|Y|) < \infty$, so $XY$ is integrable.

Let $f_n$ be simple functions with $f_n \to X$ pointwise and $|f_n| \leq |X|$ (not necessarily monotone). Then $f_n Y \to XY$ pointwise and $|f_n Y| \leq |X||Y|$, which is integrable. By the Dominated Convergence Theorem:

$$\mathbb{E}(XY) = \lim_{n \to \infty} \mathbb{E}(f_n Y).$$

Each $f_n$ is a finite linear combination of indicators of sets in $\sigma(X)$, so by linearity and the non-negative case (applied to $\mathbf{1}_A Y^+$ and $\mathbf{1}_A Y^-$ for $A \in \sigma(X)$), we get $\mathbb{E}(f_n Y) = \mathbb{E}(f_n)\mathbb{E}(Y)$. Since $\mathbb{E}(f_n) \to \mathbb{E}(X)$ (again by DCT, with dominator $|X|$), we conclude:

$$\mathbb{E}(XY) = \mathbb{E}(X)\mathbb{E}(Y).$$
