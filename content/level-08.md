---
level: 8
title: "Lebesgue Integral & Convergence Theorems"
notes: 2
prerequisites: [7]
---

# Level 8: Lebesgue Integral & Convergence Theorems

## Reading

This is where measure theory pays off. We build a notion of integral that plays nicely with limits -- something the Riemann integral struggles with. The construction proceeds in three stages (simple, non-negative, general), and then we prove the three great convergence theorems: MCT, Fatou's Lemma, and DCT.

### Why not Riemann?

The Riemann integral is built on a simple idea: approximate the area under the curve by slicing the **domain** into small intervals. For each interval $[k/n, (k+1)/n)$, take lower and upper approximations $f_n^l$ and $f_n^u$ (the infimum and supremum of $f$ on that interval). Sum up the rectangles to get lower and upper Darboux sums $\int f_n^l$ and $\int f_n^u$. If these converge to the same limit $I$, we declare $\int f = I$.

This works well for "nice" functions, but has serious deficiencies:

1. **It cannot integrate some functions it "should" be able to.** The indicator function $\mathbf{1}_{\mathbb{Q} \cap [0,1)}$ takes values 0 and 1, so it ought to have an integral -- but the lower and upper Darboux sums are 0 and 1 for every partition, so they never agree.
2. **It only applies to functions on (subsets of) $\mathbb{R}$.** We want to integrate functions on a general probability space $(\Omega, \mathcal{F}, \mathbb{P})$.
3. **Limits and integrals do not interchange well.** A sequence of Riemann integrable functions can converge pointwise to a function that is not Riemann integrable.

The Lebesgue integral fixes all of these by replacing the key axiom. Instead of "the area of a rectangle $[a, b) \times [0, 1]$ is $(b - a)$," we use:

> **(iv)** The integral $\int \mathbf{1}_A = \mu(A)$ for any measurable set $A$.

This is a more general starting point: it works on any measure space, and it integrates indicator functions of any measurable set. The trade-off is that the construction is more abstract.

### Stage 1: Simple functions

Recall that a **simple function** is a finite linear combination of indicators: $g = \sum_{i=1}^t \alpha_i \mathbf{1}_{A_i}$ where $A_i \in \mathcal{F}$.

For such a function, the integral is defined by:

$$\int_\Omega g \, \mathrm{d}\mathbb{P} = \sum_{i=1}^t \alpha_i \, \mathbb{P}(A_i).$$

This is the natural extension of axiom (iv) using linearity. But we need to check it is **well-defined**: a simple function can be written as a sum of indicators in many different ways, and the integral should not depend on which representation we use. This is Exercise 6, and the key idea is to convert any representation into the "block" (disjoint indicator) form from Exercise 3, where the answer is clearly unique.

### Stage 2: Non-negative measurable functions

For any non-negative measurable function $f : \Omega \to \mathbb{R}_{\geq 0}^\infty$ (we allow the value $\infty$), we define:

$$\int_\Omega f \, \mathrm{d}\mathbb{P} = \sup_g \int_\Omega g \, \mathrm{d}\mathbb{P},$$

where the supremum ranges over all non-negative simple functions $g$ with $g \leq f$ pointwise.

This is analogous to the lower Darboux sum in the Riemann theory, but we do not need a matching upper bound. The "magic" of the Lebesgue integral is that this supremum definition alone gives us the right answer, because we are approximating using *all* simple functions below $f$, not just step functions tied to a fixed partition.

<details>
<summary>Formal Statement (Definition 13)</summary>

**Definition 13 (Lebesgue integral, non-negative functions).** Let $(\Omega, \mathcal{F}, \mathbb{P})$ be any probability space. If $g = \sum_{i=1}^t \alpha_i \mathbf{1}_{A_i}$ is any simple function, we define $\int_\Omega g \, \mathrm{d}\mathbb{P} = \sum_{i=1}^t \alpha_i \, \mathbb{P}(A_i)$. For any non-negative measurable $f : \Omega \to \mathbb{R}_{\geq 0}^\infty$, we define $\int_\Omega f \, \mathrm{d}\mathbb{P} = \sup_g \int_\Omega g \, \mathrm{d}\mathbb{P}$, where the supremum is over non-negative simple $g$ with $g \leq f$ pointwise.

</details>

Note that we allow $f$ to take the value $\infty$. This is technically convenient: it means that taking limits of non-negative measurable functions always produces a non-negative measurable function. If $f = \infty$ on a set of positive measure, then $\int f \, \mathrm{d}\mathbb{P} = \infty$; but "interesting" functions are only $\infty$ on a set of measure zero.

**Notation.** We usually write $\int_\Omega f(\omega) \, \mathrm{d}\mathbb{P}(\omega)$ or $\int_X f(x) \, \mathrm{d}x$ depending on context. We write $\int_A f \, \mathrm{d}\mathbb{P}$ to mean $\int_\Omega f \cdot \mathbf{1}_A \, \mathrm{d}\mathbb{P}$.

### Basic properties of the integral

The integral inherits three fundamental properties (Exercise 6):

- **Well-definedness:** The integral of a simple function does not depend on its indicator representation, and for simple functions the sum definition and the supremum definition agree.
- **Linearity:** $\int_\Omega (\alpha f + \beta g) \, \mathrm{d}\mathbb{P} = \alpha \int_\Omega f \, \mathrm{d}\mathbb{P} + \beta \int_\Omega g \, \mathrm{d}\mathbb{P}$ for non-negative $f, g$ and $\alpha, \beta \geq 0$.
- **Monotonicity:** If $0 \leq f \leq g$ pointwise, then $\int_\Omega f \, \mathrm{d}\mathbb{P} \leq \int_\Omega g \, \mathrm{d}\mathbb{P}$.

Linearity for simple functions is immediate from the definition. For general non-negative functions, linearity of scalar multiplication ($\int \alpha f = \alpha \int f$) follows by a supremum argument, but linearity of addition ($\int (f+g) = \int f + \int g$) is surprisingly tricky to prove directly. The cleanest route uses the Monotone Convergence Theorem -- see below.

Another key property (Exercise 7): for a non-negative measurable function,

$$\int_\Omega f \, \mathrm{d}\mathbb{P} = 0 \quad \text{if and only if} \quad f = 0 \text{ almost surely.}$$

The forward direction uses the sets $A_n = \{\omega : f(\omega) \geq 1/n\}$; if $\mathbb{P}(A_n) > 0$ for some $n$, then $\frac{1}{n} \mathbf{1}_{A_n} \leq f$ gives $\int f \geq \frac{1}{n} \mathbb{P}(A_n) > 0$. The reverse direction notes that if $\mathbb{P}(A_n) = 0$ for all $n$, then $\mathbb{P}(f \neq 0) = \mathbb{P}(\bigcup A_n) = 0$.

### Approximation by simple functions

Exercise 8 shows that the approximating sequence from Exercise 4 (the "slab" construction $f_n = \sum_{k=0}^{n \cdot 2^n - 1} \frac{k}{2^n} \mathbf{1}_{[k/2^n, (k+1)/2^n)}(f) + n \cdot \mathbf{1}_{[n, \infty)}(f)$) has the property that $\lim_{n \to \infty} \int_\Omega f_n \, \mathrm{d}\mathbb{P} = \int_\Omega f \, \mathrm{d}\mathbb{P}$. The proof works by noting that $|f - f_n| < \varepsilon$ eventually for bounded $f$, so the integrals of $f_n$ are eventually within $\varepsilon$ of $\int f$ by monotonicity. For unbounded $f$, one uses the Monotone Convergence Theorem.

### The danger of naive limit interchange

Before stating MCT, consider the classic warning example: let $f_n = n^2 \mathbf{1}_{[1/n, 1/(n-1)]}$ on $[0,1]$. Each $f_n$ has integral roughly 1, but $f_n \to 0$ pointwise. So pointwise convergence alone does not guarantee $\lim \int f_n = \int \lim f_n$. The cure is to impose a structural condition on the sequence.

### Continuity of measure for integrals

Exercise 9 establishes a stepping stone to MCT. If $F_1 \subseteq F_2 \subseteq \ldots$ is a nested sequence of events with $\bigcup F_n = \Omega$, then for any simple function $f$:

$$\lim_{n \to \infty} \int_\Omega \mathbf{1}_{F_n} f \, \mathrm{d}\mathbb{P} = \int_\Omega f \, \mathrm{d}\mathbb{P}.$$

This follows from continuity of measure: $\mathbb{P}(F_n \cap A) \to \mathbb{P}(A)$ for each event $A$, and a simple function only involves finitely many events.

### The Monotone Convergence Theorem

This is the most important theorem in the chapter. It says that monotone limits and integrals commute.

**Theorem 14 (MCT).** Let $f_1, f_2, \ldots$ be measurable functions on $(\Omega, \mathcal{F}, \mathbb{P})$ with $0 \leq f_1 \leq f_2 \leq \ldots$ pointwise. Then $f = \lim_{n \to \infty} f_n$ is measurable, and

$$\lim_{n \to \infty} \int_\Omega f_n \, \mathrm{d}\mathbb{P} = \int_\Omega f \, \mathrm{d}\mathbb{P}.$$

The proof has two directions:
- **$\leq$ direction** (Exercise 10): Since $f_n \leq f$ pointwise, monotonicity gives $\int f_n \leq \int f$ for all $n$, so $\lim \int f_n \leq \int f$.
- **$\geq$ direction**: Fix any simple function $g \leq f$ and any $0 < \gamma < 1$. Define $A_n = \{\omega : f_n(\omega) \geq \gamma g(\omega)\}$. These sets are nested and their union is $\Omega$ (since $f_n \to f \geq g > \gamma g$ wherever $g > 0$). By monotonicity and Exercise 9, $\int f_n \geq \int f_n \mathbf{1}_{A_n} \geq \gamma \int g \mathbf{1}_{A_n} \to \gamma \int g$. Taking $\gamma \to 1$ gives $\lim \int f_n \geq \int g$. Taking the supremum over all simple $g \leq f$ gives $\lim \int f_n \geq \int f$.

The MCT is what makes the Lebesgue integral powerful: it is the engine behind linearity of the integral for general non-negative functions, and it underpins both Fatou's Lemma and the Dominated Convergence Theorem.

<details>
<summary>Formal Statement & Proof (Theorem 14 — MCT)</summary>

**Theorem 14 (Monotone Convergence Theorem).** Let $f_1, f_2, \ldots$ be measurable functions on $(\Omega, \mathcal{F}, \mathbb{P})$ with $0 \leq f_1 \leq f_2 \leq \ldots$ pointwise. Then $f = \lim_{n \to \infty} f_n$ is measurable, and $\lim_{n \to \infty} \int_\Omega f_n \, \mathrm{d}\mathbb{P} = \int_\Omega f \, \mathrm{d}\mathbb{P}$.

**Proof.**

$f = \lim f_n$ exists pointwise (monotone increasing sequence in $[0, \infty]$) and is measurable by Theorem 5. Similarly, $\lim \int f_n$ exists (monotone increasing sequence in $[0, \infty]$).

1. **Step 1 — $\leq$ direction.** Since $f_n \leq f$ pointwise for all $n$, monotonicity of the integral gives $\int f_n \leq \int f$. Taking $n \to \infty$: $\lim \int f_n \leq \int f$.
2. **Step 2 — $\geq$ direction.** Let $g$ be any non-negative simple function with $g \leq f$ pointwise, and fix $0 < \gamma < 1$. Define $A_n = \{\omega : f_n(\omega) \geq \gamma g(\omega)\}$. These sets are nested ($A_n \subseteq A_{n+1}$) because $f_n$ is increasing.
3. **Step 3 — Show $\bigcup A_n = \Omega$.** If $g(\omega) = 0$, then $\omega \in A_1$. If $g(\omega) > 0$, then $f(\omega) \geq g(\omega) > \gamma g(\omega)$, and since $f_n(\omega) \to f(\omega)$, eventually $f_n(\omega) \geq \gamma g(\omega)$, so $\omega \in A_n$ for large $n$.
4. **Step 4 — Apply continuity of measure.** By monotonicity, $\int f_n \geq \int f_n \mathbf{1}_{A_n} \geq \gamma \int g \mathbf{1}_{A_n}$. Since $g$ is a simple function and $A_1 \subseteq A_2 \subseteq \ldots$ with $\bigcup A_n = \Omega$, Exercise 9 gives $\lim_{n \to \infty} \int g \mathbf{1}_{A_n} = \int g$. Therefore $\lim \int f_n \geq \gamma \int g$.
5. **Step 5 — Let $\gamma \to 1$.** Since $\gamma < 1$ was arbitrary, $\lim \int f_n \geq \int g$. Taking the supremum over all simple $g \leq f$: $\lim \int f_n \geq \int f$.

$\square$

</details>

### Fatou's Lemma

What if the sequence is not monotone? Fatou's Lemma gives a one-sided bound.

**Theorem 15 (Fatou's Lemma).** Let $f_1, f_2, \ldots$ be any non-negative measurable functions. Then

$$\int_\Omega \liminf_{n \to \infty} f_n \, \mathrm{d}\mathbb{P} \leq \liminf_{n \to \infty} \int_\Omega f_n \, \mathrm{d}\mathbb{P}.$$

Recall that $\liminf_{n \to \infty} f_n = \lim_{n \to \infty} \inf_{k \geq n} f_k$. The functions $g_n = \inf_{k \geq n} f_k$ are pointwise monotone increasing, so MCT applies to them. Since $g_n \leq f_n$ for each $n$, monotonicity of the integral gives $\int g_n \leq \int f_n$, and then MCT plus the definition of $\liminf$ for real numbers finishes the proof.

There is also a **Reverse Fatou Lemma**: if $f_1, f_2, \ldots$ are pointwise bounded above by some integrable $g$ (i.e., $\int g \, \mathrm{d}\mathbb{P} < \infty$), then $\int \limsup f_n \geq \limsup \int f_n$. This follows by applying Fatou to $g - f_n$.

<details>
<summary>Formal Statement & Proof (Theorem 15 — Fatou's Lemma)</summary>

**Theorem 15 (Fatou's Lemma).** Let $f_1, f_2, \ldots$ be any non-negative measurable functions. Then $\int_\Omega \liminf_{n \to \infty} f_n \, \mathrm{d}\mathbb{P} \leq \liminf_{n \to \infty} \int_\Omega f_n \, \mathrm{d}\mathbb{P}$.

**Proof.**

1. **Step 1 — Define a monotone sequence.** Let $g_n = \inf_{k \geq n} f_k$. Each $g_n$ is measurable (Theorem 5). The sequence is monotone increasing: $g_{n+1} = \inf_{k \geq n+1} f_k \geq \inf_{k \geq n} f_k = g_n$ (infimum over a smaller set).
2. **Step 2 — Identify the limit.** $\lim_{n \to \infty} g_n = \sup_{n \in \mathbb{N}} \inf_{k \geq n} f_k = \liminf_{n \to \infty} f_n$ by definition.
3. **Step 3 — Apply MCT.** Since $(g_n)$ is monotone increasing and non-negative, MCT gives $\int \liminf f_n = \int \lim g_n = \lim \int g_n$.
4. **Step 4 — Use $g_n \leq f_n$.** Since $g_n = \inf_{k \geq n} f_k \leq f_n$, monotonicity of the integral gives $\int g_n \leq \int f_n$ for all $n$. Therefore $\lim \int g_n \leq \liminf \int f_n$ (if $a_n \leq b_n$ for all $n$ and $\lim a_n$ exists, then $\lim a_n \leq \liminf b_n$).

$\square$

</details>

### Stage 3: General measurable functions

So far we have only integrated non-negative functions. For a general measurable function $f : \Omega \to \mathbb{R}^{\pm\infty}$, we split it into positive and negative parts:

$$f^+ = \max(f, 0), \qquad f^- = -\min(f, 0) = \max(-f, 0).$$

Both $f^+$ and $f^-$ are non-negative measurable functions, and $f = f^+ - f^-$. We define:

$$\int_\Omega f \, \mathrm{d}\mathbb{P} = \int_\Omega f^+ \, \mathrm{d}\mathbb{P} - \int_\Omega f^- \, \mathrm{d}\mathbb{P},$$

provided at most one of $\int f^+$ and $\int f^-$ is $\infty$ (otherwise the integral is undefined). This integral is still linear and monotonic, and agrees with Definition 13 on simple functions.

<details>
<summary>Formal Statement (Definition 16)</summary>

**Definition 16 (Lebesgue integral, general functions).** Given a measurable $f : \Omega \to \mathbb{R}^{\pm\infty}$, let $f^+ = \max(f,0)$ and $f^- = -\max(-f,0)$. If at most one of $\int f^+, \int f^-$ is $\infty$, define $\int_\Omega f \, \mathrm{d}\mathbb{P} = \int_\Omega f^+ \, \mathrm{d}\mathbb{P} - \int_\Omega f^- \, \mathrm{d}\mathbb{P}$.

</details>

### Riemann vs Lebesgue: the full picture

If $f : [a,b] \to \mathbb{R}$ is Riemann integrable with finite integral, then $f$ is Lebesgue measurable (with respect to Lebesgue measure $\lambda$ on $[a,b]$), and the two integrals agree (Exercise 12). The proof uses the Darboux lower and upper functions $L(f)$ and $U(f)$: these are limits of step functions, hence measurable, and since the Riemann integral exists we have $\int L(f) = \int U(f)$. Since $L(f) \leq f \leq U(f)$ and $U(f) - L(f)$ has integral 0, Exercise 7 gives $L(f) = U(f) = f$ almost everywhere. Measurability of $f$ then follows from completeness of Lebesgue measure.

The Lebesgue integral strictly generalizes Riemann: every Riemann integrable function is Lebesgue integrable, but not conversely (e.g., $\mathbf{1}_{\mathbb{Q} \cap [0,1]}$). More importantly, the Lebesgue integral interchanges with limits under mild conditions (MCT, DCT), while the Riemann integral requires much stronger hypotheses (e.g., uniform convergence).

### The "layer cake" formula

There is an alternative definition of the Lebesgue integral (Exercise 13): for a non-negative measurable function $f$,

$$\int_\Omega f \, \mathrm{d}\mathbb{P} = \int_0^\infty \mathbb{P}(\{x : f(x) \geq t\}) \, \mathrm{d}t.$$

This "partitions the range, not the domain" -- it computes the integral by stacking horizontal slabs of height $\mathrm{d}t$ and width $\mathbb{P}(f \geq t)$. For simple functions the two definitions clearly agree (the slab representation), and for general $f$ one uses MCT with $f_N = \min(f, N)$.

### Dominated Convergence Theorem

The DCT is the most practically useful convergence theorem. It gives a sufficient condition for $\lim \int f_n = \int \lim f_n$ that does not require monotonicity.

**Theorem 17 (DCT).** Let $f_1, f_2, \ldots$ be measurable functions from $\Omega$ to $\mathbb{R}^{\pm\infty}$ converging pointwise to $f$. Suppose there exists a non-negative measurable function $g$ with $\int_\Omega g \, \mathrm{d}\mathbb{P} < \infty$ such that $|f_n| \leq g$ pointwise for all $n$. Then

$$\int_\Omega f \, \mathrm{d}\mathbb{P} = \lim_{n \to \infty} \int_\Omega f_n \, \mathrm{d}\mathbb{P} \qquad \text{and} \qquad \lim_{n \to \infty} \int_\Omega |f - f_n| \, \mathrm{d}\mathbb{P} = 0.$$

The proof applies Fatou's Lemma to $g + f_n \geq 0$ and to $g - f_n \geq 0$, obtaining both $\int f \leq \liminf \int f_n$ and $\int f \geq \limsup \int f_n$, so the limit exists and equals $\int f$.

<details>
<summary>Formal Statement & Proof (Theorem 17 — DCT)</summary>

**Theorem 17 (Dominated Convergence Theorem).** Let $f_1, f_2, \ldots$ be measurable functions from $\Omega$ to $\mathbb{R}^{\pm\infty}$ converging pointwise to $f$. Suppose there exists $g : \Omega \to \mathbb{R}_{\geq 0}^\infty$ with $\int g \, \mathrm{d}\mathbb{P} < \infty$ and $|f_n| \leq g$ pointwise for all $n$. Then $\int f \, \mathrm{d}\mathbb{P} = \lim \int f_n \, \mathrm{d}\mathbb{P}$ and $\lim \int |f - f_n| \, \mathrm{d}\mathbb{P} = 0$.

**Proof.**

1. **Step 1 — Bound $|f - f_n|$.** By the triangle inequality, $|f - f_n| \leq |f| + |f_n| \leq 2g$ pointwise. Since $f_n \to f$ pointwise, $\limsup_{n \to \infty} |f - f_n| = 0$.
2. **Step 2 — Apply Reverse Fatou.** The functions $2g - |f - f_n| \geq 0$ are non-negative. Apply Fatou's Lemma: $\int \liminf(2g - |f - f_n|) \leq \liminf \int(2g - |f - f_n|)$. The left side is $\int 2g$ (since $\liminf(2g - |f - f_n|) = 2g - \limsup|f - f_n| = 2g$). So $\int 2g \leq \int 2g - \limsup \int |f - f_n|$.
3. **Step 3 — Conclude.** Since $\int 2g < \infty$ (because $\int g < \infty$), we can subtract $\int 2g$ from both sides: $0 \leq -\limsup \int|f - f_n|$, i.e., $\limsup \int|f - f_n| \leq 0$. Since $\int|f - f_n| \geq 0$, we get $\lim \int|f - f_n| = 0$.
4. **Step 4 — Integral convergence.** $|\int f - \int f_n| = |\int(f - f_n)| \leq \int|f - f_n| \to 0$ (by linearity and monotonicity of the integral). So $\int f = \lim \int f_n$.

$\square$

</details>

## Key Results

### definition: Lebesgue integral (non-negative functions)
**Number:** Definition 13
**Plain English:** The integral of a non-negative measurable function is defined as the supremum of integrals of simple functions lying below it. For simple functions themselves, the integral is the weighted sum of the measure of each "level set."
**Formal:** Let $(\Omega, \mathcal{F}, \mathbb{P})$ be a probability space. If $g = \sum_{i=1}^t \alpha_i \mathbf{1}_{A_i}$ is a simple function, $\int_\Omega g \, \mathrm{d}\mathbb{P} = \sum_{i=1}^t \alpha_i \, \mathbb{P}(A_i)$. For any non-negative measurable $f : \Omega \to \mathbb{R}_{\geq 0}^\infty$, $\int_\Omega f \, \mathrm{d}\mathbb{P} = \sup_{g \leq f} \int_\Omega g \, \mathrm{d}\mathbb{P}$, where the supremum is over non-negative simple functions $g$.
**Key technique:** Supremum over simple approximations
**Load-bearing:** yes

### definition: Lebesgue integral (general functions)
**Number:** Definition 16
**Plain English:** To integrate a function that can take negative values, split it into its positive and negative parts and integrate each separately.
**Formal:** Given a measurable $f : \Omega \to \mathbb{R}^{\pm\infty}$, let $f^+ = \max(f,0)$ and $f^- = -\max(-f,0)$. If at most one of $\int f^+, \int f^-$ is $\infty$, define $\int_\Omega f \, \mathrm{d}\mathbb{P} = \int_\Omega f^+ \, \mathrm{d}\mathbb{P} - \int_\Omega f^- \, \mathrm{d}\mathbb{P}$.
**Key technique:** Decomposition $f = f^+ - f^-$
**Load-bearing:** yes

### theorem: Monotone Convergence Theorem (MCT)
**Number:** Theorem 14
**Plain English:** If a sequence of non-negative measurable functions increases pointwise, then the integral of the limit equals the limit of the integrals. You can swap $\lim$ and $\int$ when the sequence is monotone increasing.
**Formal:** Let $f_1, f_2, \ldots$ be measurable on $(\Omega, \mathcal{F}, \mathbb{P})$ with $0 \leq f_1 \leq f_2 \leq \ldots$ pointwise. Then $\lim_{n\to\infty} \int_\Omega f_n \, \mathrm{d}\mathbb{P} = \int_\Omega \lim_{n\to\infty} f_n \, \mathrm{d}\mathbb{P}$.
**Proof:** $f = \lim f_n$ is measurable (Theorem 5). ($\leq$): $f_n \leq f$ gives $\int f_n \leq \int f$, so $\lim \int f_n \leq \int f$. ($\geq$): Fix simple $g \leq f$ and $0 < \gamma < 1$. Let $A_n = \{f_n \geq \gamma g\}$; these are nested with $\bigcup A_n = \Omega$ (if $g(\omega) > 0$ then $f_n(\omega) \to f(\omega) \geq g(\omega) > \gamma g(\omega)$). By monotonicity $\int f_n \geq \gamma \int g \mathbf{1}_{A_n}$, and by Exercise 9 (continuity of measure for integrals) $\lim \int g \mathbf{1}_{A_n} = \int g$. So $\lim \int f_n \geq \gamma \int g$. Take $\gamma \to 1$ and sup over $g$: $\lim \int f_n \geq \int f$. $\square$
**Key technique:** Continuity of measure + supremum definition
**Load-bearing:** yes

### theorem: Fatou's Lemma
**Number:** Theorem 15
**Plain English:** For any sequence of non-negative measurable functions, the integral of the $\liminf$ is at most the $\liminf$ of the integrals. "Fatou: the integral of the limit is at most the limit of the integrals" (for non-negative functions, one-sided).
**Formal:** Let $f_1, f_2, \ldots$ be non-negative measurable functions. Then $\int_\Omega \liminf_{n\to\infty} f_n \, \mathrm{d}\mathbb{P} \leq \liminf_{n\to\infty} \int_\Omega f_n \, \mathrm{d}\mathbb{P}$.
**Proof:** Define $g_n = \inf_{k \geq n} f_k$; these are non-negative, measurable, and monotone increasing with $\lim g_n = \liminf f_n$. By MCT: $\int \liminf f_n = \lim \int g_n$. Since $g_n \leq f_n$: $\int g_n \leq \int f_n$. Therefore $\lim \int g_n \leq \liminf \int f_n$. $\square$
**Key technique:** Reduce to MCT via $g_n = \inf_{k \geq n} f_k$
**Load-bearing:** yes

### theorem: Dominated Convergence Theorem (DCT)
**Number:** Theorem 17
**Plain English:** If a sequence of measurable functions converges pointwise and is uniformly bounded by an integrable function, then the limit of the integrals equals the integral of the limit.
**Formal:** Let $f_n \to f$ pointwise, with $|f_n| \leq g$ for all $n$ and $\int g \, \mathrm{d}\mathbb{P} < \infty$. Then $\int f \, \mathrm{d}\mathbb{P} = \lim \int f_n \, \mathrm{d}\mathbb{P}$ and $\lim \int |f - f_n| \, \mathrm{d}\mathbb{P} = 0$.
**Proof:** Since $|f - f_n| \leq |f| + |f_n| \leq 2g$ and $f_n \to f$ pointwise, we have $\limsup|f-f_n| = 0$. Apply Fatou to $2g - |f - f_n| \geq 0$: $\int 2g \leq \liminf \int(2g - |f-f_n|) = \int 2g - \limsup \int|f-f_n|$. Since $\int 2g < \infty$, subtract to get $\limsup \int|f-f_n| \leq 0$, so $\lim \int|f-f_n| = 0$. Finally, $|\int f - \int f_n| \leq \int|f-f_n| \to 0$, giving $\int f = \lim \int f_n$. $\square$
**Key technique:** Two applications of Fatou's Lemma
**Load-bearing:** yes

## Exercises

### exercise: Well-definedness, linearity, monotonicity of the integral
**Number:** Exercise 6
**Difficulty:** standard
**Tags:** integral, well-defined, linearity, monotonicity

**Question:**
(a) Prove that the Lebesgue integral of a simple function is well-defined: it does not depend on the choice of indicator representation. Also show that for simple functions, the sum definition and the supremum definition agree.

(b) Prove linearity: $\int_\Omega (\alpha f + \beta g) \, \mathrm{d}\mathbb{P} = \alpha \int_\Omega f \, \mathrm{d}\mathbb{P} + \beta \int_\Omega g \, \mathrm{d}\mathbb{P}$ for non-negative measurable $f, g$ and $\alpha, \beta \geq 0$. *(Hint: first prove this for simple functions.)*

(c) Prove monotonicity: if $0 \leq f \leq g$ pointwise, then $\int_\Omega f \, \mathrm{d}\mathbb{P} \leq \int_\Omega g \, \mathrm{d}\mathbb{P}$.

**Hint 1:** For well-definedness, use the disjoint block representation
Convert any indicator representation to the disjoint "block" form from Exercise 3. In the block form, the integral is clearly $\sum v_i \mathbb{P}(B_i)$ where $B_i$ are disjoint and $v_i$ are the distinct values. This does not depend on the original representation.

**Hint 2:** For the supremum = sum agreement, show both inequalities
The sum definition gives a specific simple function $\leq f$, so it is $\leq$ the supremum. For the reverse, any simple $g \leq f$ can be combined with $f$ via $f = g + (f - g)$ where $f - g \geq 0$, and writing $f$ in block form shows $\int g \leq \int f$ (sum definition). For linearity of general functions, use MCT with approximating sequences.

**Solution:**
**(a)** Let $f = \sum_{i=1}^t \alpha_i \mathbf{1}_{A_i}$ be any indicator representation. Convert to the block (disjoint) form using Exercise 3: this gives $f = \sum_{j=1}^r v_j \mathbf{1}_{B_j}$ where the $B_j$ are disjoint and $v_j$ are the distinct values of $f$. The block form depends only on $f$ as a function, not on the representation. The integral in block form is $\sum v_j \mathbb{P}(B_j)$, and one checks that the sum $\sum \alpha_i \mathbb{P}(A_i)$ equals this by grouping terms (each $A_i$ is a union of blocks, and the $\alpha_i$ sum correctly on each block).

For the supremum definition: since $f$ is itself a non-negative simple function with $f \leq f$, we have $\sup_g \int g \geq \int f$. Conversely, if $g \leq f$ is simple, write $f = g + (f-g)$ where $f - g \geq 0$ is simple with non-negative integral. Then $\int g = \int f - \int(f-g) \leq \int f$. So $\sup_g \int g = \int f$.

**(b)** For simple functions, linearity follows directly from the definition: taking the block representations and combining them. For scalar multiplication of general $f$: if $\alpha = 0$ it is trivial; if $\alpha > 0$, the simple functions below $\alpha f$ are exactly $\alpha$ times the simple functions below $f$, so $\int \alpha f = \alpha \int f$. For addition of general non-negative $f, g$: let $f_n, g_n$ be monotone increasing simple approximations from Exercise 4. Then $f_n + g_n \nearrow f + g$, and by MCT (Theorem 14), $\int(f+g) = \lim \int(f_n + g_n) = \lim(\int f_n + \int g_n) = \int f + \int g$.

**(c)** Monotonicity: if $0 \leq f \leq g$, then any simple $h$ with $h \leq f$ also satisfies $h \leq g$. So the supremum defining $\int f$ is taken over a subset of the set defining $\int g$, giving $\int f \leq \int g$.

### exercise: Integral zero iff zero almost surely
**Number:** Exercise 7
**Difficulty:** standard
**Tags:** integral, almost-surely, zero

**Question:**
Prove that for non-negative measurable functions $f$: $\int_\Omega f \, \mathrm{d}\mathbb{P} = 0$ if and only if $f = 0$ almost surely.

**Hint 1:** For the forward direction, consider the sets $A_n = \{\omega : f(\omega) \geq 1/n\}$
If $\int f = 0$ and $\mathbb{P}(A_n) > 0$ for some $n$, then $\frac{1}{n} \mathbf{1}_{A_n}$ is a simple function with $\frac{1}{n}\mathbf{1}_{A_n} \leq f$. What does this say about $\int f$?

**Hint 2:** For the reverse direction, use countable additivity
$\{f \neq 0\} = \bigcup_{n \in \mathbb{N}} A_n$. If $\mathbb{P}(A_n) = 0$ for all $n$, then $\mathbb{P}(f \neq 0) = 0$. Conversely, if $f = 0$ a.s. and $g \leq f$ is simple, then every term $\alpha_i \mathbf{1}_{A_i}$ in $g$ with $\alpha_i > 0$ must have $A_i \subseteq \{f > 0\}$, so $\mathbb{P}(A_i) = 0$.

**Solution:**
$(\Rightarrow)$: Define $A_n = \{\omega \in \Omega : f(\omega) \geq 1/n\}$. If $\mathbb{P}(A_n) > 0$ for some $n$, then $\frac{1}{n}\mathbf{1}_{A_n} \leq f$ is a simple function with integral $\frac{1}{n}\mathbb{P}(A_n) > 0$, so $\int f \geq \frac{1}{n}\mathbb{P}(A_n) > 0$, contradicting $\int f = 0$. Therefore $\mathbb{P}(A_n) = 0$ for all $n$.

Now $\{f \neq 0\} = \{f > 0\} = \bigcup_{n=1}^\infty A_n$, so $\mathbb{P}(f \neq 0) \leq \sum_{n=1}^\infty \mathbb{P}(A_n) = 0$. Hence $f = 0$ a.s.

$(\Leftarrow)$: If $f = 0$ a.s. and $g = \sum \alpha_i \mathbf{1}_{A_i}$ is a non-negative simple function with $g \leq f$, then for each $i$ with $\alpha_i > 0$ we have $A_i \subseteq \{f > 0\}$ which has measure 0, so $\mathbb{P}(A_i) = 0$. Hence $\int g = \sum \alpha_i \mathbb{P}(A_i) = 0$. Taking the supremum over all such $g$, $\int f = 0$.

### exercise: Limit of integrals equals the integral
**Number:** Exercise 10
**Difficulty:** standard
**Tags:** MCT, monotone-convergence, upper-bound

**Question:**
In the setting of Theorem 14 (MCT), prove that $\int_\Omega \lim_{n\to\infty} f_n \, \mathrm{d}\mathbb{P}$ exists and is an upper bound for the sequence $\left(\int_\Omega f_n \, \mathrm{d}\mathbb{P}\right)_{n \in \mathbb{N}}$.

**Hint 1:** Why does the integral of $f = \lim f_n$ exist?
Every non-negative measurable function has a well-defined integral (possibly $\infty$) by Definition 13. So you just need to show $f$ is measurable (use Theorem 5: pointwise limit of measurable functions is measurable).

**Hint 2:** Use monotonicity of the integral
Since $f_n \leq f$ pointwise for every $n$ (because the sequence is increasing and $f$ is the limit), monotonicity gives $\int f_n \leq \int f$ for all $n$. This makes $\int f$ an upper bound. Also argue that $\int f_n$ is monotone increasing (by $f_n \leq f_{n+1}$) so the limit exists.

**Solution:**
$f := \lim_{n\to\infty} f_n$ exists pointwise: for each $\omega$, the sequence $f_n(\omega)$ is monotone increasing, so it either converges to a finite limit or tends to $\infty$. By Theorem 5, $f$ is measurable. Since $f \geq 0$, Definition 13 gives $\int_\Omega f \, \mathrm{d}\mathbb{P} \in [0, \infty]$.

Since $f_n \leq f$ pointwise for all $n$, monotonicity of the integral gives $\int_\Omega f_n \, \mathrm{d}\mathbb{P} \leq \int_\Omega f \, \mathrm{d}\mathbb{P}$ for all $n$.

The sequence $\int f_n$ is itself monotone increasing (since $f_n \leq f_{n+1}$ gives $\int f_n \leq \int f_{n+1}$), so $\lim_{n\to\infty} \int f_n$ exists in $[0, \infty]$ and satisfies $\lim \int f_n \leq \int f$.

### exercise: Prove Fatou's Lemma
**Number:** Exercise 11
**Difficulty:** standard
**Tags:** Fatou, liminf, MCT

**Question:**
Prove Theorem 15 (Fatou's Lemma): if $f_1, f_2, \ldots$ are non-negative measurable functions, then

$$\int_\Omega \liminf_{n \to \infty} f_n \, \mathrm{d}\mathbb{P} \leq \liminf_{n \to \infty} \int_\Omega f_n \, \mathrm{d}\mathbb{P}.$$

*Hint: recall that $\liminf_{n\to\infty} f_n = \lim_{n\to\infty} \inf_{k \geq n} f_k$, and that the $\inf_{k\geq n} f_k$ are pointwise monotone increasing. Use monotonicity of the integral together with MCT.*

**Hint 1:** Define $g_n = \inf_{k \geq n} f_k$ and check monotonicity
Since $\inf_{k \geq n+1} f_k \geq \inf_{k \geq n} f_k$ (we are taking the infimum over a smaller set), the sequence $g_n$ is pointwise monotone increasing. Also $g_n \leq f_n$ for all $n$.

**Hint 2:** Apply MCT to $(g_n)$ and use $g_n \leq f_n$
By MCT, $\int \liminf f_n = \int \lim g_n = \lim \int g_n$. Since $g_n \leq f_n$, we have $\int g_n \leq \int f_n$. Therefore $\lim \int g_n \leq \liminf \int f_n$.

**Solution:**
Define $g_n = \inf_{k \geq n} f_k$. Then:

1. Each $g_n$ is measurable (infimum of measurable functions is measurable by Theorem 5).
2. $g_n \leq g_{n+1}$ pointwise (since $\inf_{k \geq n+1}$ is an infimum over a subset of $\{k \geq n\}$).
3. $\lim_{n\to\infty} g_n = \liminf_{n\to\infty} f_n$ by definition of $\liminf$.
4. $g_n \leq f_n$ for all $n$ (since $\inf_{k \geq n} f_k \leq f_n$).

Since $(g_n)$ is a monotone increasing sequence of non-negative measurable functions, the MCT applies:

$$\int_\Omega \liminf_{n\to\infty} f_n \, \mathrm{d}\mathbb{P} = \int_\Omega \lim_{n\to\infty} g_n \, \mathrm{d}\mathbb{P} = \lim_{n\to\infty} \int_\Omega g_n \, \mathrm{d}\mathbb{P}.$$

From (4) and monotonicity of the integral: $\int g_n \leq \int f_n$ for all $n$. Therefore:

$$\lim_{n\to\infty} \int_\Omega g_n \, \mathrm{d}\mathbb{P} \leq \liminf_{n\to\infty} \int_\Omega f_n \, \mathrm{d}\mathbb{P},$$

where the last step uses: if $a_n \leq b_n$ for all $n$ and $\lim a_n$ exists, then $\lim a_n \leq \liminf b_n$.

### exercise: Continuity of measure for integrals
**Number:** Exercise 9
**Difficulty:** standard
**Tags:** continuity-of-measure, nested-sets, integral

**Question:**
Let $F_1 \subseteq F_2 \subseteq \ldots$ be a sequence of events in $(\Omega, \mathcal{F}, \mathbb{P})$ whose union is $\Omega$. Prove that for any $A \in \mathcal{F}$:

$$\lim_{n\to\infty} \int_\Omega \mathbf{1}_{F_n} \mathbf{1}_A \, \mathrm{d}\mathbb{P} = \mathbb{P}(A).$$

Deduce that for any simple function $f$: $\lim_{n\to\infty} \int_\Omega \mathbf{1}_{F_n} f \, \mathrm{d}\mathbb{P} = \int_\Omega f \, \mathrm{d}\mathbb{P}$.

**Hint 1:** Rephrase the first part using continuity of measure
$\int_\Omega \mathbf{1}_{F_n} \mathbf{1}_A \, \mathrm{d}\mathbb{P} = \mathbb{P}(F_n \cap A)$. The sets $F_n \cap A$ are nested with union $A$.

**Hint 2:** For simple functions, use linearity
Write $f = \sum \alpha_i \mathbf{1}_{A_i}$ and apply linearity of the integral (for simple functions) plus the first part to each $\mathbf{1}_{A_i}$ term.

**Solution:**
$\int_\Omega \mathbf{1}_{F_n} \mathbf{1}_A \, \mathrm{d}\mathbb{P} = \int_\Omega \mathbf{1}_{F_n \cap A} \, \mathrm{d}\mathbb{P} = \mathbb{P}(F_n \cap A)$.

Since $F_1 \cap A \subseteq F_2 \cap A \subseteq \ldots$ and $\bigcup_n (F_n \cap A) = (\bigcup_n F_n) \cap A = \Omega \cap A = A$, continuity of measure gives $\lim_{n\to\infty} \mathbb{P}(F_n \cap A) = \mathbb{P}(A)$.

For a simple function $f = \sum_{i=1}^t \alpha_i \mathbf{1}_{A_i}$: by linearity of the integral for simple functions,

$$\int_\Omega \mathbf{1}_{F_n} f \, \mathrm{d}\mathbb{P} = \sum_{i=1}^t \alpha_i \int_\Omega \mathbf{1}_{F_n} \mathbf{1}_{A_i} \, \mathrm{d}\mathbb{P} = \sum_{i=1}^t \alpha_i \, \mathbb{P}(F_n \cap A_i).$$

Taking $n \to \infty$ and using the first part for each $A_i$:

$$\lim_{n\to\infty} \int_\Omega \mathbf{1}_{F_n} f \, \mathrm{d}\mathbb{P} = \sum_{i=1}^t \alpha_i \, \mathbb{P}(A_i) = \int_\Omega f \, \mathrm{d}\mathbb{P}.$$

(Note: we only use linearity for simple functions here, not general linearity, to avoid circularity.)

### exercise: Riemann integrable implies Lebesgue measurable
**Number:** Exercise 12
**Difficulty:** challenging
**Tags:** Riemann, Lebesgue, measurability

**Question:**
Prove that if $f : [a,b] \to \mathbb{R}$ is Riemann integrable with finite integral, then $f$ is measurable with respect to the Lebesgue measure $\lambda$ on $[a,b]$.

**Hint 1:** Use Darboux lower and upper functions
For a sequence of partitions $P_k$ witnessing the Riemann integral (with $P_{k+1}$ refining $P_k$), define $L(P_k, f)$ as the step function taking value $\inf_I f$ on each interval $I \in P_k$, and similarly $U(P_k, f)$ taking value $\sup_I f$. Let $L(f) = \lim_k L(P_k, f)$ and $U(f) = \lim_k U(P_k, f)$.

**Hint 2:** Show $L(f) = f = U(f)$ almost everywhere
Since $L(f) \leq f \leq U(f)$ and $\int L(f) = \int U(f)$ (Riemann integrability), we have $\int(U(f) - L(f)) = 0$. By Exercise 7, $U(f) - L(f) = 0$ a.e. So $f = L(f)$ a.e., and $L(f)$ is measurable (as a pointwise limit of step functions). Measurability of $f$ then follows from completeness of Lebesgue measure.

**Solution:**
Let $P_k$ be a sequence of partitions of $[a,b]$ such that $P_{k+1}$ refines $P_k$ and the Darboux sums converge. Define step functions $L(P_k, f)$ and $U(P_k, f)$ on each interval $I \in P_k$ by the infimum and supremum of $f$ on $I$.

The sequence $L(P_k, f)$ is pointwise increasing and bounded above by $f$. The sequence $U(P_k, f)$ is pointwise decreasing and bounded below by $f$. Define $L(f) = \lim_k L(P_k, f)$ and $U(f) = \lim_k U(P_k, f)$. These are measurable (pointwise limits of step functions, which are simple).

We have $L(f) \leq f \leq U(f)$ pointwise. By monotonicity of the Lebesgue integral (step functions are both Riemann and Lebesgue integrable with the same value):

$$\int_{[a,b]} L(P_k, f) \, \mathrm{d}x \leq \int_{[a,b]} L(f) \, \mathrm{d}x \leq \int_{[a,b]} U(f) \, \mathrm{d}x \leq \int_{[a,b]} U(P_k, f) \, \mathrm{d}x.$$

As $k \to \infty$, both outer integrals converge to the Riemann integral of $f$, so $\int L(f) = \int U(f)$. Since $U(f) - L(f) \geq 0$ and $\int(U(f) - L(f)) = 0$, Exercise 7 gives $U(f) = L(f)$ a.e. So $f = L(f)$ a.e.

For measurability: let $F$ be any Borel set. Then $(U(f))^{-1}(F) \in \mathcal{L}([a,b])$ since $U(f)$ is measurable. Since $f$ and $U(f)$ agree outside a set $A$ with $\lambda(A) = 0$, we have $f^{-1}(F) = (U(f))^{-1}(F) \setminus A' \cup A''$ for some $A', A'' \subseteq A$. By completeness of Lebesgue measure, $A'$ and $A''$ are measurable, so $f^{-1}(F)$ is Lebesgue measurable.

### exercise: Layer cake formula
**Number:** Exercise 13
**Difficulty:** standard
**Tags:** layer-cake, alternative-definition, integral

**Question:**
Prove that for a non-negative measurable function $f$, Lebesgue's alternative definition

$$\int_0^\infty \mathbb{P}(\{x : f(x) \geq t\}) \, \mathrm{d}t$$

gives the same integral as Definition 13.

**Hint 1:** First check agreement for simple functions
For a simple function $g = \sum v_i \mathbf{1}_{B_i}$ in block form, draw the "slab" picture: $\mathbb{P}(g \geq t)$ is a step function in $t$, and the Riemann integral $\int_0^\infty \mathbb{P}(g \geq t) \, \mathrm{d}t$ computes the same sum $\sum v_i \mathbb{P}(B_i)$.

**Hint 2:** For general $f$, truncate and use MCT
Let $f_N = \min(f, N)$. Both definitions agree for bounded functions by Exercise 8 (approximate by simple functions). Then $f_N \nearrow f$, and use MCT on both sides.

**Solution:**
For a simple function $g = \sum_{i=1}^r v_i \mathbf{1}_{B_i}$ in block form (with $0 \leq v_1 < v_2 < \ldots < v_r$ and disjoint $B_i$): $\mathbb{P}(g \geq t)$ is a decreasing step function of $t$, taking value $\sum_{i:v_i \geq t} \mathbb{P}(B_i)$ on appropriate intervals. Computing the Riemann integral in $t$ gives exactly $\sum v_i \mathbb{P}(B_i) = \int g \, \mathrm{d}\mathbb{P}$.

For general non-negative measurable $f$: the layer cake formula satisfies monotonicity (if $f \leq g$ then $\{f \geq t\} \subseteq \{g \geq t\}$) and agrees with Definition 13 on simple functions. For bounded $f$, Exercise 8 provides simple $g_n \nearrow f$ with $\int g_n \to \int f$. By MCT, the layer cake integrals of $g_n$ also converge to the layer cake integral of $f$.

For unbounded $f$: let $f_N = \min(f, N)$. Then $f_N$ is bounded, so both definitions agree for $f_N$. By MCT (as $f_N \nearrow f$), Definition 13 gives $\int f_N \to \int f$. For the layer cake side, $\mathbb{P}(f_N \geq t) \nearrow \mathbb{P}(f \geq t)$ for each $t$, and the monotone convergence theorem for the Riemann integral on $[0, \infty)$ gives convergence.
