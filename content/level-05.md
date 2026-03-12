---
level: 5
title: "Carathéodory Extension Theorem"
notes: 1
prerequisites: [4]
---

# Level 5: Carathéodory Extension Theorem

## Reading

This is the climax of Notes 1 — the payoff for all the groundwork on algebras, $\sigma$-algebras, and countable operations. The goal: we have a pre-measure on an algebra (which is easy to define) and we want to extend it to a genuine measure on a $\sigma$-algebra (which is what we actually need). The result that makes this possible is the Carathéodory Extension Theorem.

### The problem

Suppose we want to construct the "uniform probability measure" on $[0, 1)$, assigning length $b - a$ to each half-open interval $[a, b)$. The collection of finite unions of half-open intervals forms an algebra $\mathcal{A}$, and the length function is easy to define on $\mathcal{A}$. But we need a measure on a $\sigma$-algebra — we need to assign consistent values to countable unions, intersections, and complements. How do we get from the algebra to the $\sigma$-algebra?

The Carathéodory Extension Theorem answers: define inner and outer pre-measures, declare a set "measurable" when they agree, and prove this collection forms a $\sigma$-algebra on which the common value is a measure.

### Pre-measures

A **pre-measure** is "almost a measure" but defined on an algebra instead of a $\sigma$-algebra.

**Definition 32.** Let $\mathcal{A}$ be an algebra on $X$, and suppose $\mu_0 : \mathcal{A} \to \mathbb{R}_{\geq 0}^\infty$ satisfies $\mu_0(\emptyset) = 0$ and the **countable pre-additivity** condition: for all pairwise disjoint $A_1, A_2, \ldots \in \mathcal{A}$ with $\bigcup_i A_i \in \mathcal{A}$, we have $\mu_0\big(\bigcup_i A_i\big) = \sum_i \mu_0(A_i)$. Then $\mu_0$ is a pre-measure.

<details>
<summary>Formal Statement (Definition 32)</summary>

**Definition 32.** Let $\mathcal{A}$ be an algebra on $X$. A function $\mu_0 : \mathcal{A} \to \mathbb{R}_{\geq 0}^\infty$ with $\mu_0(\emptyset) = 0$ is a **pre-measure** if for all pairwise disjoint $A_1, A_2, \ldots \in \mathcal{A}$ with $\bigcup_i A_i \in \mathcal{A}$, we have $\mu_0\big(\bigcup_i A_i\big) = \sum_i \mu_0(A_i)$.

</details>

The key point: we only ask $\mathcal{A}$ to be an algebra (closed under *finite* unions), but we require countable additivity whenever the countable union happens to land back in $\mathcal{A}$. This is a much weaker requirement than being a full measure, because we only need to check it for sets already in $\mathcal{A}$.

### Outer and inner pre-measures

Given a pre-measure $\mu_0$ on an algebra $\mathcal{A}$ with $\mu_0(X) = 1$ (the probability case), we define for any $S \subseteq X$:

$$\mu_0^*(S) = \inf_{\substack{A_1, A_2, \ldots \in \mathcal{A} \\ \text{countable covering of } S}} \sum_{i=1}^\infty \mu_0(A_i).$$

We call $\sum_{i=1}^\infty \mu_0(A_i)$ the **size** of the covering $A_1, A_2, \ldots$ The outer pre-measure is the infimum of sizes over all countable coverings from $\mathcal{A}$.

The **inner pre-measure** is defined by:

$$\mu_{0*}(S) = 1 - \mu_0^*(S^c).$$

The intuition is: the outer pre-measure measures $S$ "from outside" (covering it with algebra sets), while the inner pre-measure measures $S$ "from inside" (by looking at how much space the complement leaves). When these agree, $S$ has a well-defined size.

<details>
<summary>Formal Statement (Outer and Inner Pre-measures)</summary>

**Outer pre-measure.** For any $S \subseteq X$:

$$\mu_0^*(S) = \inf \Big\{\sum_{i=1}^\infty \mu_0(A_i) : A_1, A_2, \ldots \in \mathcal{A},\, S \subseteq \bigcup_i A_i\Big\}.$$

**Inner pre-measure.** $\mu_{0*}(S) = 1 - \mu_0^*(S^c)$.

</details>

**Important subtlety:** The infimum in the definition of $\mu_0^*$ is genuinely an infimum, not a minimum. Theorem 34 gives a striking example: $\mathbb{Q} \cap [0, 1)$ has $\mu_0^*(\mathbb{Q} \cap [0,1)) = 0$ (we can cover the rationals with intervals of arbitrarily small total length), but there is no countable covering of size exactly 0 (any covering must contain a non-empty interval, which already has positive pre-measure).

<details>
<summary>Formal Statement and Proof (Theorem 34)</summary>

**Theorem 34.** For each $\varepsilon > 0$, the set $\mathbb{Q} \cap [0,1)$ has a countable covering by half-open intervals of total size at most $\varepsilon$.

**Proof.** For each denominator $b$, there are $n(b) = b$ rationals $\frac{a}{b}$ in $[0,1)$ (namely $\frac{0}{b}, \frac{1}{b}, \ldots, \frac{b-1}{b}$). Choose half-interval length $f(b) = 2^{-b-1}b^{-1}\varepsilon$. For each rational $\frac{a}{b}$, place a half-open interval of length $f(b)$ centred on $\frac{a}{b}$. The total size is $\sum_{b=1}^\infty b \cdot f(b) = \sum_{b=1}^\infty 2^{-b-1}\varepsilon = \frac{\varepsilon}{2} < \varepsilon$. $\square$

</details>

### The key lemma: $\varepsilon$-good coverings

A countable covering $A, A_1, A_2, \ldots$ of a set $S$ is **$\varepsilon$-good** if its size $\sum_{i=1}^\infty \mu_0(A_i) \leq \varepsilon$. We call $A$ the **main set** and $A_1, A_2, \ldots$ the **leftover**.

**Lemma 35** is the workhorse of the entire proof. It says: if you have $\varepsilon$-good coverings of both $S$ and $S^c$, and $\mu_{0*}(S) = \mu_0^*(S) = p$, then the main sets $A$ and $B$ satisfy $\mu_0(A) \in [p - \varepsilon, p + \varepsilon]$, $\mu_0(B) \in [1 - p - \varepsilon, 1 - p + \varepsilon]$, and crucially $\mu_0(A \cap B) \leq 4\varepsilon$.

The idea is that $A$ roughly covers $S$ and $B$ roughly covers $S^c$, so their overlap $A \cap B$ should be small. The leftover pieces create small "errors" that are controlled by $\varepsilon$.

<details>
<summary>Formal Statement and Proof (Lemma 35)</summary>

**Lemma 35.** Given $\mu_{0*}(S) = \mu_0^*(S) = p$, if $A, A_1, \ldots$ is an $\varepsilon$-good covering of $S$ with size at most $p + \varepsilon$, and $B, B_1, \ldots$ is an $\varepsilon$-good covering of $S^c$ with size at most $1 - p + \varepsilon$, then $\mu_0(A) \in [p - \varepsilon, p + \varepsilon]$, $\mu_0(B) \in [1 - p - \varepsilon, 1 - p + \varepsilon]$, and $\mu_0(A \cap B) \leq 4\varepsilon$.

**Proof.**

1. **Step 1 — Bound $\mu_0(A)$.** The size of the covering $A, A_1, \ldots$ is $\mu_0(A) + \sum_{i=1}^\infty \mu_0(A_i)$. This is at most $p + \varepsilon$ by assumption. Since $0 \leq \sum \mu_0(A_i) \leq \varepsilon$, we get $\mu_0(A) \in [p - \varepsilon, p + \varepsilon]$.
2. **Step 2 — Bound $\mu_0(B)$ similarly.** $\mu_0(B) \in [1 - p - \varepsilon, 1 - p + \varepsilon]$.
3. **Step 3 — Bound $\mu_0(A \cap B)$.** Observe $A \setminus B, B, A_1, B_1, A_2, B_2, \ldots$ is a countable covering of $X$ whose size is $\mu_0(A \setminus B) + \mu_0(B) + \sum \mu_0(A_i) + \sum \mu_0(B_i)$. By countable pre-additivity (there exists a disjoint covering with the same size, by Exercise 15), the size is at least $\mu_0(X) = 1$. So $\mu_0(A \setminus B) + \mu_0(B) \geq 1 - 2\varepsilon$, giving $\mu_0(A \setminus B) \geq 1 - 2\varepsilon - \mu_0(B) \geq p - 3\varepsilon$. Since $A = (A \setminus B) \cup (A \cap B)$ is a disjoint union, $\mu_0(A \cap B) = \mu_0(A) - \mu_0(A \setminus B) \leq (p + \varepsilon) - (p - 3\varepsilon) = 4\varepsilon$. $\square$

</details>

### Theorem 36: the probability case

**Theorem 36 (Carathéodory Extension Theorem, probability measures).** Suppose $\mathcal{A}$ is an algebra on $X$ and $\mu_0$ is a pre-measure on $\mathcal{A}$ with $\mu_0(X) = 1$. Then:

$$\mathcal{F} = \{S \subseteq X : \mu_{0*}(S) = \mu_0^*(S)\}$$

is a $\sigma$-algebra containing $\mathcal{A}$, the restriction $\mu$ of $\mu_{0*}$ to $\mathcal{F}$ is a measure, $\mu|_\mathcal{A} = \mu_0$, and $\mu$ is the *unique* measure on $\mathcal{F}$ extending $\mu_0$.

The proof has three main parts:

1. **$\mathcal{F}$ is an algebra.** Closure under complements is easy (Exercise 18): swapping $S$ and $S^c$ just swaps inner and outer. Closure under intersection is harder — this is where Lemma 35 does the heavy lifting. Given $F, F' \in \mathcal{F}$, pick near-optimal coverings of $F, F^c, F', F'^c$, combine them into a covering of $F \cap F'$ and $(F \cap F')^c$, and show the errors are $O(\varepsilon)$. Since $\varepsilon$ was arbitrary, $\mu_0^*(F \cap F') + \mu_0^*((F \cap F')^c) \leq 1$, forcing equality by Lemma 33.

2. **$\mathcal{F}$ is a $\sigma$-algebra and $\mu$ is countably additive.** Given disjoint $F_1, F_2, \ldots \in \mathcal{F}$, the series $\sum \mu(F_i)$ must converge (since the partial sums are bounded by 1). Use the "main part + leftover" trick: take the first $n$ sets as the main part, and note the remaining sets form a tail with small total measure. Combine coverings using the diagonal enumeration (Theorem 17) and verify the total error stays small.

3. **$\mu$ is unique.** Any other measure $\mu'$ on $\mathcal{F}$ extending $\mu_0$ must satisfy $\mu'(F) \leq \mu_0^*(F)$ (by the union bound applied to any covering) and similarly $\mu'(F^c) \leq \mu_0^*(F^c)$. Since $\mu'(F) + \mu'(F^c) = 1$ and $\mu_0^*(F) + \mu_0^*(F^c) \leq 1$ with equality on $\mathcal{F}$, we get $\mu' = \mu$.

<details>
<summary>Formal Statement and Proof (Theorem 36)</summary>

**Theorem 36 (Carathéodory Extension Theorem, probability measures).** Suppose $\mathcal{A}$ is an algebra on $X$ and $\mu_0$ is a pre-measure on $\mathcal{A}$ with $\mu_0(X) = 1$. Then $\mathcal{F} = \{S \subseteq X : \mu_{0*}(S) = \mu_0^*(S)\}$ is a $\sigma$-algebra containing $\mathcal{A}$, the restriction $\mu$ of $\mu_{0*}$ to $\mathcal{F}$ is a measure with $\mu|_\mathcal{A} = \mu_0$, and $\mu$ is the unique measure on $\mathcal{F}$ extending $\mu_0$.

**Proof.**

1. **$\mathcal{A} \subseteq \mathcal{F}$:** For $A \in \mathcal{A}$, the covering $A$ (with no leftover) has size $\mu_0(A)$, so $\mu_0^*(A) \leq \mu_0(A)$. Similarly $\mu_0^*(A^c) \leq \mu_0(A^c) = 1 - \mu_0(A)$. By Lemma 33, $\mu_{0*}(A) \leq \mu_0^*(A)$, and $\mu_{0*}(A) = 1 - \mu_0^*(A^c) \geq 1 - (1 - \mu_0(A)) = \mu_0(A)$. So $\mu_0^*(A) = \mu_{0*}(A) = \mu_0(A)$.
2. **Closure under complements (Exercise 18):** If $\mu_{0*}(S) = \mu_0^*(S)$, then $\mu_{0*}(S^c) = 1 - \mu_0^*(S) = 1 - \mu_{0*}(S) = \mu_0^*(S^c)$.
3. **Closure under intersection:** Given $F, F' \in \mathcal{F}$ and $\varepsilon > 0$, choose $\varepsilon$-good coverings of $F, F^c, F', F'^c$. Using Lemma 35, construct coverings of $F \cap F'$ and $(F \cap F')^c$ by combining the main sets and leftovers. The overlaps $\mu_0(A \cap A')$ etc. are $O(\varepsilon)$ by Lemma 35. After tracking all error terms, $\mu_0^*(F \cap F') + \mu_0^*((F \cap F')^c) \leq 1 + C\varepsilon$ for a constant $C$. Since $\varepsilon$ is arbitrary, equality holds by Lemma 33.
4. **Countable additivity:** Given disjoint $F_1, F_2, \ldots \in \mathcal{F}$ with $\sum \mu(F_i)$ convergent, take the first $n$ as the "main part" and the rest as the tail. The tail has small total measure. Combine coverings using diagonal enumeration (Theorem 17) and verify total error stays small.
5. **Uniqueness:** Any other measure $\mu'$ on $\mathcal{F}$ extending $\mu_0$ satisfies $\mu'(F) \leq \mu_0^*(F)$ (by the union bound applied to any covering) and $\mu'(F^c) \leq \mu_0^*(F^c)$. Since $\mu'(F) + \mu'(F^c) = 1$ and $\mu_0^*(F) + \mu_0^*(F^c) = 1$ on $\mathcal{F}$, we get $\mu' = \mu$. $\square$

</details>

### Theorem 37: the $\sigma$-finite case

A pre-measure $\mu_0$ is **$\sigma$-finite** if $X = \bigcup_{i=1}^\infty A_i$ where each $A_i \in \mathcal{A}$ has $\mu_0(A_i) < \infty$. We can assume the $A_i$ are disjoint.

**Theorem 37.** If $\mu_0$ is a $\sigma$-finite pre-measure on an algebra $\mathcal{A}$, then there exists a $\sigma$-algebra $\mathcal{F} \supseteq \mathcal{A}$ and a unique measure $\mu$ on $\mathcal{F}$ with $\mu|_\mathcal{A} = \mu_0$.

The proof reduces to the probability case: rescale $\mu_0$ on each piece $A_i$ to get a probability measure, apply Theorem 36 to get $\sigma$-algebras $\mathcal{F}_i$ and measures $\mu_i$, then glue them together using Theorem 38 (which combines measures on disjoint pieces).

### Theorem 39: the general case

Without $\sigma$-finiteness, we can still extend $\mu_0$ to a measure, but we lose uniqueness.

**Theorem 39.** For any algebra $\mathcal{A}$ and pre-measure $\mu_0$ on $\mathcal{A}$, there is a $\sigma$-algebra $\mathcal{F} \supseteq \mathcal{A}$ and a measure $\mu$ on $\mathcal{F}$ with $\mu|_\mathcal{A} = \mu_0$.

Exercise 20 gives a concrete example of non-uniqueness: on $[0,1)$, the algebra of countable/co-countable sets with $\mu_0(A) = 0$ if $A$ is countable and $\mu_0(A) = 1$ if $A^c$ is countable admits two different extensions (the Lebesgue measure and the measure induced by $F(x) = x^2$).

### Constructing Lebesgue measure

All the abstract machinery pays off here. On $[0, 1)$, let $\mathcal{A}$ be the algebra of finite unions of half-open intervals $[a, b)$.

**Theorem 40.** For any increasing continuous $F : [0,1) \to \mathbb{R}$, the function $\mu_0([a,b)) = F(b) - F(a)$ defines a unique pre-measure on $\mathcal{A}$.

Choosing $F(x) = x$ gives the Lebesgue pre-measure on $[0,1)$. Applying Theorem 36 (with appropriate normalisation) extends it to the Lebesgue measure on $[0,1)$.

<details>
<summary>Formal Statement and Proof (Theorem 40)</summary>

**Theorem 40.** For any increasing continuous $F : [0,1) \to \mathbb{R}$, the function $\mu_0([a,b)) = F(b) - F(a)$ defines a unique pre-measure on $\mathcal{A}$ (the algebra of finite unions of half-open intervals in $[0,1)$).

**Proof.**

1. **Step 1 — Well-definedness.** Any $A \in \mathcal{A}$ is a finite disjoint union of half-open intervals $[a_1, b_1) \cup \cdots \cup [a_k, b_k)$. Define $\mu_0(A) = \sum_{i=1}^k (F(b_i) - F(a_i))$. This is well-defined (independent of representation) because different representations of the same set must decompose into the same disjoint intervals.
2. **Step 2 — Finite additivity.** If $A, B \in \mathcal{A}$ are disjoint, their union is also a finite union of disjoint half-open intervals, and $\mu_0$ applied to the union equals the sum (endpoints cancel correctly because $F$ is a function).
3. **Step 3 — Countable pre-additivity ($\leq$).** If $[a,b) = \bigcup_{i=1}^\infty [a_i, b_i)$ with disjoint $[a_i, b_i) \in \mathcal{A}$, then the partial sums $\sum_{i=1}^n \mu_0([a_i, b_i)) \leq \mu_0([a, b))$ by finite subadditivity (monotonicity). So $\sum_{i=1}^\infty \mu_0([a_i, b_i)) \leq \mu_0([a, b))$.
4. **Step 4 — Countable pre-additivity ($\geq$, the hard direction).** Fix $\varepsilon > 0$. By continuity of $F$, choose slightly larger closed intervals $[\alpha_i, \beta_i] \supseteq [a_i, b_i)$ with $F(\beta_i) - F(\alpha_i) \leq (F(b_i) - F(a_i)) + \varepsilon 2^{-i}$, and a slightly smaller closed interval $[\alpha, \beta] \subseteq [a, b)$ with $F(\beta) - F(\alpha) \geq F(b) - F(a) - \varepsilon$. Now $[\alpha, \beta] \subseteq [a,b) \subseteq \bigcup [\alpha_i, \beta_i]$ is an open cover of a compact set. By Heine-Borel, a finite subcover suffices: $[\alpha, \beta] \subseteq \bigcup_{i=1}^N [\alpha_i, \beta_i]$. Then $\mu_0([a,b)) \leq F(\beta) - F(\alpha) + \varepsilon \leq \sum_{i=1}^N (F(\beta_i) - F(\alpha_i)) + \varepsilon \leq \sum_{i=1}^\infty \mu_0([a_i, b_i)) + 2\varepsilon$. Since $\varepsilon$ is arbitrary, $\mu_0([a,b)) \leq \sum_{i=1}^\infty \mu_0([a_i, b_i))$. $\square$

</details>

For $\mathbb{R}$: write $\mathbb{R} = \bigcup_{n \in \mathbb{Z}} [n, n+1)$. For any increasing continuous $F : \mathbb{R} \to \mathbb{R}$, apply Theorem 40 on each $[n, n+1)$, then Theorem 36 to get a measure $\mu_n$ on each piece, and finally Theorem 38 to glue them into a measure on $\mathbb{R}$. With $F(x) = x$, we get Lebesgue measure on $\mathbb{R}$. With $F$ equal to the Gaussian CDF, we get the Gaussian measure. Any continuous measure on $[0,1)$ (one that assigns measure 0 to every singleton) arises this way.

## Key Results

### definition: Pre-measure
**Number:** Definition 32
**Plain English:** A "proto-measure" defined on an algebra instead of a $\sigma$-algebra — it's finitely additive by default and countably additive whenever the countable union stays in the algebra.
**Formal:** Let $\mathcal{A}$ be an algebra on $X$. A function $\mu_0 : \mathcal{A} \to \mathbb{R}_{\geq 0}^\infty$ with $\mu_0(\emptyset) = 0$ is a pre-measure if for all pairwise disjoint $A_1, A_2, \ldots \in \mathcal{A}$ with $\bigcup_i A_i \in \mathcal{A}$, we have $\mu_0(\bigcup_i A_i) = \sum_i \mu_0(A_i)$.
**Load-bearing:** yes

### definition: Outer and inner pre-measures
**Number:** (p.27)
**Plain English:** The outer pre-measure covers $S$ from outside using algebra sets; the inner pre-measure measures $S$ from inside by subtracting the outer pre-measure of the complement from 1.
**Formal:** For $S \subseteq X$: $\mu_0^*(S) = \inf \big\{\sum_{i=1}^\infty \mu_0(A_i) : A_1, A_2, \ldots \in \mathcal{A},\, S \subseteq \bigcup_i A_i\big\}$ and $\mu_{0*}(S) = 1 - \mu_0^*(S^c)$.
**Load-bearing:** yes

### lemma: Inner pre-measure is at most outer pre-measure
**Number:** Lemma 33
**Plain English:** You can't measure more from inside than from outside — the inner pre-measure never exceeds the outer.
**Formal:** Given an algebra $\mathcal{A}$ on $X$ and pre-measure $\mu_0$ with $\mu_0(X) = 1$, for any $S \subseteq X$ we have $\mu_{0*}(S) \leq \mu_0^*(S)$.
**Proof:** Suppose for contradiction $\mu_{0*}(S) = \mu_0^*(S) + \varepsilon$ for some $\varepsilon > 0$. By definition, there is a countable covering $A_1, A_2, \ldots$ of $S$ with size at most $\mu_0^*(S) + \frac{1}{4}\varepsilon$, and another $B_1, B_2, \ldots$ of $S^c$ with size at most $\mu_0^*(S^c) + \frac{1}{4}\varepsilon = 1 - \mu_{0*}(S) + \frac{1}{4}\varepsilon = 1 - \mu_0^*(S) - \varepsilon + \frac{1}{4}\varepsilon$. Then $A_1, B_1, A_2, B_2, \ldots$ is a countable covering of $X$ with size at most $\mu_0^*(S) + \frac{1}{4}\varepsilon + 1 - \mu_0^*(S) - \varepsilon + \frac{1}{4}\varepsilon = 1 - \frac{1}{2}\varepsilon$. By Exercise 15, there exists a disjoint countable covering $C_1, C_2, \ldots$ of $X$ with the same union and size at most $1 - \frac{1}{2}\varepsilon$. By countable pre-additivity, $\mu_0(X) = \sum \mu_0(C_i) \leq 1 - \frac{1}{2}\varepsilon < 1$, contradicting $\mu_0(X) = 1$. $\square$
**Key technique:** Covering argument with summable errors
**Load-bearing:** yes

### theorem: Covering rationals with small intervals
**Number:** Theorem 34
**Plain English:** The rationals in $[0,1)$ can be covered by half-open intervals whose total length is arbitrarily small, even though the rationals are dense.
**Formal:** For each $\varepsilon > 0$, the set $\mathbb{Q} \cap [0,1)$ has a countable covering with half-intervals of size at most $\varepsilon$.
**Proof:** For each denominator $b \in \mathbb{N}$, there are $n(b) = b$ rationals $\frac{a}{b} \in [0,1)$ (namely $\frac{0}{b}, \frac{1}{b}, \ldots, \frac{b-1}{b}$). Choose $f(b) = 2^{-b-1}b^{-1}\varepsilon$. For each rational $\frac{a}{b}$, place a half-open interval $A_{a,b}$ of length $f(b)$ centred on $\frac{a}{b}$. The collection of all $A_{a,b}$ covers $\mathbb{Q} \cap [0,1)$, and the total size is $\sum_{b=1}^\infty b \cdot f(b) = \sum_{b=1}^\infty 2^{-b-1}\varepsilon = \frac{\varepsilon}{2} < \varepsilon$. $\square$
**Key technique:** Geometric series to make total length summable
**Load-bearing:** yes

### lemma: Main set and leftover technique
**Number:** Lemma 35
**Plain English:** If you have near-optimal coverings of both $S$ and $S^c$, then the "main sets" from each covering have small overlap and their pre-measures are close to $\mu_0^*(S)$ and $1 - \mu_0^*(S)$ respectively.
**Formal:** Given $\mu_{0*}(S) = \mu_0^*(S) = p$, if $A, A_1, \ldots$ is an $\varepsilon$-good covering of $S$ with size at most $p + \varepsilon$, and $B, B_1, \ldots$ is an $\varepsilon$-good covering of $S^c$ with size at most $1 - p + \varepsilon$, then $\mu_0(A) \in [p - \varepsilon, p + \varepsilon]$, $1 - \mu_0(B) \in [p - \varepsilon, p + \varepsilon]$, and $\mu_0(A \cap B) \leq 4\varepsilon$.
**Proof:**
1. **Step 1 — Bound $\mu_0(A)$.** The size of the covering $A, A_1, \ldots$ is $\mu_0(A) + \sum_{i=1}^\infty \mu_0(A_i)$. This is at most $p + \varepsilon$ by assumption. Since $0 \leq \sum \mu_0(A_i) \leq \varepsilon$, we get $\mu_0(A) \in [p - \varepsilon, p + \varepsilon]$.
2. **Step 2 — Bound $\mu_0(B)$ similarly.** $\mu_0(B) \in [1 - p - \varepsilon, 1 - p + \varepsilon]$.
3. **Step 3 — Bound $\mu_0(A \cap B)$.** Observe $A \setminus B, B, A_1, B_1, A_2, B_2, \ldots$ is a countable covering of $X$ whose size is $\mu_0(A \setminus B) + \mu_0(B) + \sum \mu_0(A_i) + \sum \mu_0(B_i)$. By countable pre-additivity (there exists a disjoint covering with the same size, by Exercise 15), the size is at least $\mu_0(X) = 1$. So $\mu_0(A \setminus B) + \mu_0(B) \geq 1 - 2\varepsilon$, giving $\mu_0(A \setminus B) \geq 1 - 2\varepsilon - \mu_0(B) \geq p - 3\varepsilon$. Since $A = (A \setminus B) \cup (A \cap B)$ is a disjoint union, $\mu_0(A \cap B) = \mu_0(A) - \mu_0(A \setminus B) \leq (p + \varepsilon) - (p - 3\varepsilon) = 4\varepsilon$. $\square$
**Key technique:** Bounding errors from leftover pieces
**Load-bearing:** yes

### theorem: Carathéodory Extension Theorem (probability)
**Number:** Theorem 36
**Plain English:** Starting from a pre-measure on an algebra with total mass 1, the sets where inner and outer pre-measures agree form a $\sigma$-algebra, and the common value is the unique extending measure.
**Formal:** If $\mathcal{A}$ is an algebra on $X$ and $\mu_0$ is a pre-measure with $\mu_0(X) = 1$, then $\mathcal{F} = \{S \subseteq X : \mu_{0*}(S) = \mu_0^*(S)\}$ is a $\sigma$-algebra containing $\mathcal{A}$, the restriction $\mu$ of $\mu_{0*}$ to $\mathcal{F}$ is a measure with $\mu|_\mathcal{A} = \mu_0$, and $\mu$ is the unique measure on $\mathcal{F}$ extending $\mu_0$.
**Proof:**
1. **$\mathcal{A} \subseteq \mathcal{F}$:** For $A \in \mathcal{A}$, the covering $A$ (with no leftover) has size $\mu_0(A)$, so $\mu_0^*(A) \leq \mu_0(A)$. Similarly $\mu_0^*(A^c) \leq \mu_0(A^c) = 1 - \mu_0(A)$. By Lemma 33, $\mu_{0*}(A) \leq \mu_0^*(A)$, and $\mu_{0*}(A) = 1 - \mu_0^*(A^c) \geq 1 - (1 - \mu_0(A)) = \mu_0(A)$. So $\mu_0^*(A) = \mu_{0*}(A) = \mu_0(A)$.
2. **Closure under complements (Exercise 18):** If $\mu_{0*}(S) = \mu_0^*(S)$, then $\mu_{0*}(S^c) = 1 - \mu_0^*(S) = 1 - \mu_{0*}(S) = \mu_0^*(S^c)$.
3. **Closure under intersection:** Given $F, F' \in \mathcal{F}$ and $\varepsilon > 0$, choose $\varepsilon$-good coverings of $F, F^c, F', F'^c$. Using Lemma 35, construct coverings of $F \cap F'$ and $(F \cap F')^c$ by combining the main sets and leftovers. The overlaps $\mu_0(A \cap A')$ etc. are $O(\varepsilon)$ by Lemma 35. After tracking all error terms, $\mu_0^*(F \cap F') + \mu_0^*((F \cap F')^c) \leq 1 + C\varepsilon$ for a constant $C$. Since $\varepsilon$ is arbitrary, equality holds by Lemma 33.
4. **Countable additivity:** Given disjoint $F_1, F_2, \ldots \in \mathcal{F}$ with $\sum \mu(F_i)$ convergent, take the first $n$ as the "main part" and the rest as the tail. The tail has small total measure. Combine coverings using diagonal enumeration (Theorem 17) and verify total error stays small.
5. **Uniqueness:** Any other measure $\mu'$ on $\mathcal{F}$ extending $\mu_0$ satisfies $\mu'(F) \leq \mu_0^*(F)$ (by the union bound applied to any covering) and $\mu'(F^c) \leq \mu_0^*(F^c)$. Since $\mu'(F) + \mu'(F^c) = 1$ and $\mu_0^*(F) + \mu_0^*(F^c) = 1$ on $\mathcal{F}$, we get $\mu' = \mu$. $\square$
**Key technique:** $\varepsilon$-good coverings with summable errors; letting $\varepsilon \to 0$
**Load-bearing:** yes

### theorem: Carathéodory Extension Theorem ($\sigma$-finite)
**Number:** Theorem 37
**Plain English:** The extension theorem also works for $\sigma$-finite pre-measures, and the extending measure is still unique.
**Formal:** If $\mathcal{A}$ is an algebra on $X$ and $\mu_0$ is a $\sigma$-finite pre-measure on $\mathcal{A}$, there is a $\sigma$-algebra $\mathcal{F} \supseteq \mathcal{A}$ and a unique measure $\mu$ on $\mathcal{F}$ with $\mu|_\mathcal{A} = \mu_0$.
**Proof:** Write $X = \bigcup_{i=1}^\infty Y_i$ as a disjoint union with $\mu_0(Y_i) < \infty$ (possible by $\sigma$-finiteness). Define $\mu_0^{(i)}(A) = \mu_0(A \cap Y_i) / \mu_0(Y_i)$ on $\mathcal{A}_i = \{A \cap Y_i : A \in \mathcal{A}\}$. Each $\mu_0^{(i)}$ is a probability pre-measure on the algebra $\mathcal{A}_i$ on $Y_i$. By Theorem 36, extend to $\mathcal{F}_i$ and $\mu_i$. Rescale back: $\hat{\mu}_i = \mu_0(Y_i) \cdot \mu_i$. Apply Theorem 38 to glue into a measure $\mu$ on $\mathcal{F}$. Uniqueness: if $\mu'$ also extends $\mu_0$, then $\mu'|_{Y_i}$ is an extension of $\mu_0^{(i)}$ (rescaled) on $\mathcal{F}_i$, and Theorem 36 gives uniqueness on each piece, so $\mu' = \mu$. $\square$
**Key technique:** Reduction to probability case by rescaling
**Load-bearing:** yes

### theorem: Combining measures on disjoint pieces
**Number:** Theorem 38
**Plain English:** If you have measures on disjoint pieces of $X$, they glue together into a unique measure on the whole space.
**Formal:** Given pairwise disjoint sets $Y_i$ with $\sigma$-algebras $\mathcal{F}_i$ and measures $\mu_i$ on $Y_i$, there is a $\sigma$-algebra $\mathcal{F}$ on $\bigcup Y_i$ and a unique measure $\mu$ on $\mathcal{F}$ with $\mu|_{\mathcal{F}_i} = \mu_i$ and $\mathcal{F}_i = \{F \in \mathcal{F} : F \subseteq Y_i\}$.
**Key technique:** Define $\mu(F) = \sum_i \mu_i(F \cap Y_i)$
**Load-bearing:** yes

### theorem: Carathéodory Extension Theorem (general)
**Number:** Theorem 39
**Plain English:** Even without $\sigma$-finiteness, a pre-measure extends to a measure — but the extension may not be unique.
**Formal:** For any algebra $\mathcal{A}$ on $X$ and pre-measure $\mu_0$ on $\mathcal{A}$, there exists a $\sigma$-algebra $\mathcal{F} \supseteq \mathcal{A}$ and a measure $\mu$ on $\mathcal{F}$ with $\mu|_\mathcal{A} = \mu_0$.
**Key technique:** Reduce to the $\sigma$-finite parts; assign $\infty$ to non-$\sigma$-finite sets
**Load-bearing:** no

### theorem: Pre-measure from increasing continuous function
**Number:** Theorem 40
**Plain English:** Any increasing continuous function on $[0,1)$ gives rise to a pre-measure on the algebra of finite unions of half-open intervals, which then extends to a full measure (e.g. Lebesgue measure).
**Formal:** For any increasing continuous $F : [0,1) \to \mathbb{R}$, there is a unique pre-measure $\mu_0$ on $\mathcal{A}$ (finite unions of half-open intervals in $[0,1)$) with $\mu_0([a,b)) = F(b) - F(a)$ for all $0 \leq a < b \leq 1$.
**Proof:**
1. **Step 1 — Well-definedness.** Any $A \in \mathcal{A}$ is a finite disjoint union of half-open intervals $[a_1, b_1) \cup \cdots \cup [a_k, b_k)$. Define $\mu_0(A) = \sum_{i=1}^k (F(b_i) - F(a_i))$. This is well-defined (independent of representation) because different representations of the same set must decompose into the same disjoint intervals.
2. **Step 2 — Finite additivity.** If $A, B \in \mathcal{A}$ are disjoint, their union is also a finite union of disjoint half-open intervals, and $\mu_0$ applied to the union equals the sum (endpoints cancel correctly because $F$ is a function).
3. **Step 3 — Countable pre-additivity ($\leq$).** If $[a,b) = \bigcup_{i=1}^\infty [a_i, b_i)$ with disjoint $[a_i, b_i) \in \mathcal{A}$, then the partial sums $\sum_{i=1}^n \mu_0([a_i, b_i)) \leq \mu_0([a, b))$ by finite subadditivity (monotonicity). So $\sum_{i=1}^\infty \mu_0([a_i, b_i)) \leq \mu_0([a, b))$.
4. **Step 4 — Countable pre-additivity ($\geq$, the hard direction).** Fix $\varepsilon > 0$. By continuity of $F$, choose slightly larger closed intervals $[\alpha_i, \beta_i] \supseteq [a_i, b_i)$ with $F(\beta_i) - F(\alpha_i) \leq (F(b_i) - F(a_i)) + \varepsilon 2^{-i}$, and a slightly smaller closed interval $[\alpha, \beta] \subseteq [a, b)$ with $F(\beta) - F(\alpha) \geq F(b) - F(a) - \varepsilon$. Now $[\alpha, \beta] \subseteq [a,b) \subseteq \bigcup [\alpha_i, \beta_i]$ is an open cover of a compact set. By Heine-Borel, a finite subcover suffices: $[\alpha, \beta] \subseteq \bigcup_{i=1}^N [\alpha_i, \beta_i]$. Then $\mu_0([a,b)) \leq F(\beta) - F(\alpha) + \varepsilon \leq \sum_{i=1}^N (F(\beta_i) - F(\alpha_i)) + \varepsilon \leq \sum_{i=1}^\infty \mu_0([a_i, b_i)) + 2\varepsilon$. Since $\varepsilon$ is arbitrary, $\mu_0([a,b)) \leq \sum_{i=1}^\infty \mu_0([a_i, b_i))$. $\square$
**Key technique:** Compactness (Heine-Borel) for the hard inequality
**Load-bearing:** yes

## Exercises

### exercise: Disjoint Covering from Any Covering
**Number:** Exercise 15
**Difficulty:** warm-up
**Tags:** pre-measure, covering, disjoint

**Question:**
Suppose $A_1, A_2, \ldots$ is a countable covering of $S$ (with $A_i \in \mathcal{A}$). Prove that there exists a countable covering $B_1, B_2, \ldots$ of $S$ which is disjoint, whose size is at most the size of $A_1, A_2, \ldots$, and with $\bigcup_{i=1}^\infty A_i = \bigcup_{i=1}^\infty B_i$.

**Hint 1:** Remove previously covered parts
Let $B_1 = A_1$ and for $n \geq 2$, define $B_n = A_n \setminus (A_1 \cup \cdots \cup A_{n-1})$. Check these are pairwise disjoint and have the same union.

**Hint 2:** Show $B_n \in \mathcal{A}$ and bound the sizes
Since $\mathcal{A}$ is an algebra, $B_n = A_n \setminus (A_1 \cup \cdots \cup A_{n-1}) \in \mathcal{A}$. Use Exercise 10(a) (monotonicity of $\mu_0$): $0 \leq \mu_0(B_n) \leq \mu_0(A_n)$, so by the comparison test the size of $B_1, B_2, \ldots$ is at most the size of $A_1, A_2, \ldots$

**Solution:**
Let $B_1 = A_1$ and $B_n = A_n \setminus (A_1 \cup \cdots \cup A_{n-1})$ for $n \geq 2$. By definition, these sets are pairwise disjoint: if $m < n$, then $B_n \subseteq A_n \setminus A_m$ so $B_n \cap B_m = \emptyset$.

The union is the same: $B_n \subseteq A_n$ gives $\bigcup B_i \subseteq \bigcup A_i$. Conversely, if $x \in \bigcup A_i$, let $n$ be the smallest index with $x \in A_n$. Then $x \notin A_1 \cup \cdots \cup A_{n-1}$, so $x \in B_n$.

Since $\mathcal{A}$ is an algebra, all $B_n$ are in $\mathcal{A}$. By monotonicity (Exercise 10(a)), $0 \leq \mu_0(B_n) \leq \mu_0(A_n)$ for each $n$. So by the comparison test (Theorem 19), $\sum_{i=1}^\infty \mu_0(B_i) \leq \sum_{i=1}^\infty \mu_0(A_i)$.

### exercise: Covering the Rationals in $[0,1)$
**Number:** Exercise 16
**Difficulty:** standard
**Tags:** outer-pre-measure, covering, geometric-series

**Question:**
Fill in the details of Theorem 34: what is $n(b)$, the number of rational points in $[0,1)$ with denominator $b$? And given $\varepsilon > 0$, what should we choose for $f(b)$ (the half-interval length for denominator $b$) to get $\sum_{b=1}^\infty f(b) \cdot n(b) < \varepsilon$?

**Hint 1:** Count the rationals with denominator $b$
The rationals $\frac{a}{b} \in [0,1)$ with denominator exactly $b$ (not necessarily in lowest terms) are $\frac{0}{b}, \frac{1}{b}, \ldots, \frac{b-1}{b}$. So $n(b) = b$.

**Hint 2:** Choose $f(b)$ to make a geometric series
We need $\sum_{b=1}^\infty b \cdot f(b) < \varepsilon$. Try $f(b) = 2^{-b-1} b^{-1} \varepsilon$, so that $\sum b \cdot f(b) = \sum 2^{-b-1}\varepsilon = \frac{\varepsilon}{2}$.

**Solution:**
We have $n(b) = b$ (the points $\frac{0}{b}, \frac{1}{b}, \ldots, \frac{b-1}{b}$).

Choose $f(b) = 2^{-b-1} b^{-1} \varepsilon$. Then:

$$\sum_{b=1}^\infty b \cdot f(b) = \sum_{b=1}^\infty b \cdot 2^{-b-1} b^{-1} \varepsilon = \sum_{b=1}^\infty 2^{-b-1} \varepsilon = \frac{\varepsilon}{2} < \varepsilon.$$

For each rational $\frac{a}{b} \in [0,1)$ (with $0 \leq a \leq b-1$), let $A_{a,b}$ be the half-open interval $\big[\frac{a}{b} - 2^{-b-2}b^{-1}\varepsilon,\, \frac{a}{b} + 2^{-b-2}b^{-1}\varepsilon\big)$. Each $A_{a,b}$ has length $f(b) = 2^{-b-1}b^{-1}\varepsilon$, and by construction $\frac{a}{b} \in A_{a,b}$. The collection of all $A_{a,b}$ covers $\mathbb{Q} \cap [0,1)$ with total size $\frac{\varepsilon}{2} < \varepsilon$.

This proves $\mu_0^*(\mathbb{Q} \cap [0,1)) = 0$ (the infimum of sizes is 0). But no covering achieves size exactly 0: any covering must include a non-empty half-open interval $[a,b)$ with $b - a > 0$, so the size is strictly positive.

### exercise: From Finite-Size Covering to $\varepsilon$-Good Covering
**Number:** Exercise 17
**Difficulty:** standard
**Tags:** epsilon-good, covering, main-set-leftover

**Question:**
Prove that if $B_1, B_2, \ldots$ is a countable covering of $S$ with finite size (i.e., $\sum_{i=1}^\infty \mu_0(B_i)$ converges), then there exists an $\varepsilon$-good countable covering of $S$ with at most the same size and the same union.

**Hint 1:** Split into a "main set" and a "leftover"
Since $\sum \mu_0(B_i)$ converges, there exists $n$ such that the tail $\sum_{i=n+1}^\infty \mu_0(B_i) < \varepsilon$. Let $A = B_1 \cup \cdots \cup B_n$ (the main set, which is in $\mathcal{A}$) and $A_i = B_{n+i}$ for $i \geq 1$ (the leftover).

**Hint 2:** Verify the covering is $\varepsilon$-good and has the right size
The new covering is $A, A_1, A_2, \ldots$ with $\sum_{i=1}^\infty \mu_0(A_i) = \sum_{i=n+1}^\infty \mu_0(B_i) < \varepsilon$, so it is $\varepsilon$-good. Its total size is $\mu_0(A) + \sum \mu_0(A_i)$. Use Exercise 10(a) to show $\mu_0(A) \leq \sum_{i=1}^n \mu_0(B_i)$.

**Solution:**
Let $s = \sum_{i=1}^\infty \mu_0(B_i)$ be the size of the original covering, and let $\varepsilon > 0$.

Since the series converges, there exists $n \in \mathbb{N}$ such that $\sum_{i=n+1}^\infty \mu_0(B_i) < \varepsilon$.

Let $A = B_1 \cup \cdots \cup B_n$ and for each $i \geq 1$, let $A_i = B_{n+i}$. The new covering $A, A_1, A_2, \ldots$ has the same union as $B_1, B_2, \ldots$ (since $A$ absorbs the first $n$ sets). It is $\varepsilon$-good because $\sum_{i=1}^\infty \mu_0(A_i) = \sum_{i=n+1}^\infty \mu_0(B_i) < \varepsilon$.

The size of the new covering is $\mu_0(A) + \sum_{i=1}^\infty \mu_0(A_i)$. By Exercise 10(a), $\mu_0(A) \leq \mu_0(B_1) + \cdots + \mu_0(B_n)$ (since $A \subseteq B_1 \cup \cdots \cup B_n$ and $\mu_0$ is finitely subadditive on $\mathcal{A}$). The partial sum is bounded by $\sum_{i=1}^{n+i-1} \mu_0(B_i)$, and the leftover terms are the same. So the total size is at most $s$.

### exercise: $\mathcal{F}$ is Closed Under Complements
**Number:** Exercise 18
**Difficulty:** warm-up
**Tags:** caratheodory, sigma-algebra, complement

**Question:**
Prove that $\mathcal{F} = \{S \subseteq X : \mu_{0*}(S) = \mu_0^*(S)\}$ is closed under complements, and that $\mu(F^c) = 1 - \mu(F)$ for all $F \in \mathcal{F}$.

**Hint 1:** Write the definitions of inner and outer pre-measure for $F^c$
We have $\mu_{0*}(F^c) = 1 - \mu_0^*(F)$ and $\mu_0^*(F^c) = 1 - \mu_{0*}(F)$ (directly from the definition $\mu_{0*}(S) = 1 - \mu_0^*(S^c)$).

**Hint 2:** Use the fact that $F \in \mathcal{F}$ means $\mu_{0*}(F) = \mu_0^*(F)$
If $\mu_{0*}(F) = \mu_0^*(F) = \mu(F)$, then $\mu_{0*}(F^c) = 1 - \mu_0^*(F) = 1 - \mu(F)$ and $\mu_0^*(F^c) = 1 - \mu_{0*}(F) = 1 - \mu(F)$. So $\mu_{0*}(F^c) = \mu_0^*(F^c)$, proving $F^c \in \mathcal{F}$.

**Solution:**
Given $F \in \mathcal{F}$, we have $\mu_{0*}(F) = \mu_0^*(F)$. Call this common value $\mu(F)$.

By definition: $\mu_{0*}(F^c) = 1 - \mu_0^*((F^c)^c) = 1 - \mu_0^*(F) = 1 - \mu(F)$.

Also: $\mu_0^*(F^c) = 1 - \mu_{0*}(F^{cc}) = ?$ — but we can get this more directly. We need $\mu_0^*(F^c)$. By the definition of inner pre-measure applied to $F$: $\mu_{0*}(F) = 1 - \mu_0^*(F^c)$. Since $\mu_{0*}(F) = \mu(F)$, we get $\mu_0^*(F^c) = 1 - \mu(F)$.

So $\mu_{0*}(F^c) = 1 - \mu(F) = \mu_0^*(F^c)$. This shows $F^c \in \mathcal{F}$ with $\mu(F^c) = 1 - \mu(F)$.

### exercise: Non-Unique Extension
**Number:** Exercise 20
**Difficulty:** standard
**Tags:** caratheodory, uniqueness, counterexample, sigma-finite

**Question:**
Let $X = [0, 1)$, and let $\mathcal{A}$ consist of all subsets of $X$ which are either countable or whose complement is countable. Define $\mu_0$ on $\mathcal{A}$ by $\mu_0(A) = 0$ if $A$ is countable, and $\mu_0(A) = 1$ if $A^c$ is countable. Show that $\mathcal{A}$ is an algebra and $\mu_0$ is a pre-measure. Prove that there exists a $\sigma$-algebra $\mathcal{F}$ containing $\mathcal{A}$ and two *different* measures $\mu, \mu'$ on $\mathcal{F}$, both of whose restrictions to $\mathcal{A}$ are $\mu_0$.

**Hint 1:** Verify $\mathcal{A}$ is an algebra and $\mu_0$ is a pre-measure
Closure under complements: if $A$ is countable, $A^c$ is co-countable and vice versa. For finite unions: a finite union of countable sets is countable, and if any set is co-countable, the union is too. For countable pre-additivity: if $\bigcup A_i \in \mathcal{A}$ with the $A_i$ disjoint, at most one $A_i$ can be co-countable (since they're disjoint subsets of $[0,1)$).

**Hint 2:** Use two different increasing continuous functions
Take $\mathcal{F}$ to be the Lebesgue $\sigma$-algebra (or Borel $\sigma$-algebra) on $[0,1)$. Let $F(x) = x$ and $F^*(x) = x^2$. By Theorem 40, both give pre-measures on the algebra of half-open intervals. Both assign 0 to countable sets and 1 to co-countable sets, so both extend $\mu_0$. But $\lambda([0, \frac{1}{2})) = \frac{1}{2}$ while $\mu'([0, \frac{1}{2})) = \frac{1}{4}$.

**Solution:**
**$\mathcal{A}$ is an algebra:** Complements are immediate (countable $\leftrightarrow$ co-countable). For unions: if $A, B \in \mathcal{A}$, then either both are countable (so $A \cup B$ is countable), or at least one is co-countable (so $A \cup B$ is co-countable since it contains a co-countable set). Intersections: $A \cap B = (A^c \cup B^c)^c$. Since $\Omega = [0,1)$ is uncountable, $\Omega \in \mathcal{A}$ (it's co-countable).

**$\mu_0$ is a pre-measure:** Clearly $\mu_0(\emptyset) = 0$. For countable pre-additivity, suppose $A_1, A_2, \ldots$ are pairwise disjoint with $\bigcup A_i \in \mathcal{A}$. If all $A_i$ are countable, the union is countable and $\mu_0(\bigcup A_i) = 0 = \sum \mu_0(A_i)$. If some $A_k$ is co-countable, then since the $A_i$ are disjoint, all others $A_i$ ($i \neq k$) must be subsets of $A_k^c$ which is countable, so at most one $A_i$ is co-countable. Then $\mu_0(\bigcup A_i) = 1 = \mu_0(A_k) + \sum_{i \neq k} 0$.

**Two different extensions:** Let $\mathcal{F} = \bar{\mathcal{B}}([0,1))$ be the Lebesgue $\sigma$-algebra. Define $\mu$ via $F(x) = x$ (Lebesgue measure) and $\mu'$ via $F^*(x) = x^2$. Both are measures on $\mathcal{F}$. Both assign 0 to every countable set (since singletons have measure 0 for both) and 1 to every co-countable set (since both are probability measures and countable sets have measure 0). So both extend $\mu_0$.

But $\mu([0, \tfrac{1}{2})) = \tfrac{1}{2}$ while $\mu'([0, \tfrac{1}{2})) = \tfrac{1}{4}$, so $\mu \neq \mu'$.

This does not contradict Theorem 36 because $\mu_0$ is not a pre-measure on the algebra of half-open intervals — it's a pre-measure on the much smaller countable/co-countable algebra $\mathcal{A}$, and the $\sigma$-algebra $\mathcal{F}$ returned by Theorem 36 applied to $\mathcal{A}$ and $\mu_0$ would just be $\mathcal{A}$ itself (since any uncountable set $S$ with uncountable complement has $\mu_0^*(S) = 1$ but $\mu_{0*}(S) = 0$).

### exercise: $\mathcal{F}$ is Closed Under Disjoint Union and $\mu$ is Additive
**Number:** Exercise 19
**Difficulty:** challenge
**Tags:** caratheodory, sigma-algebra, additivity, epsilon-good

**Question:**
Prove that $\mathcal{F}$ is closed under disjoint union. That is, given disjoint sets $F, F' \in \mathcal{F}$, prove that $F \cup F' \in \mathcal{F}$ and $\mu(F \cup F') = \mu(F) + \mu(F')$.

*Hint: as with intersection, choose $\varepsilon$-good countable coverings for both the inner and outer pre-measure of $F$ and of $F'$. First try to prove the special case where the leftovers are all empty, and use this to build up to the general case.*

**Hint 1:** Start with the "very special" case
If the leftover is empty, then $A$ covers $F$ and $A'$ covers $F'$, with $A \cup A'$ covering $F \cup F'$. Since $F$ and $F'$ are disjoint, $F \subseteq F'^c \subseteq B'$, so $A \cap B'$ should be small. The size of the covering $A \cup A'$ is $\mu_0(A) + \mu_0(A')$, which is close to $\mu(F) + \mu(F')$.

**Hint 2:** In the general case, track the errors from leftovers
Use Lemma 35: the main sets $A, A'$ (for $F$ and $F'$) and $B, B'$ (for $F^c$ and $F'^c$) satisfy bounds like $\mu_0(A \cap A') \leq 5\varepsilon$ and $\mu_0(A' \cap B') \leq 4\varepsilon$. Combine the coverings $A, A', A_1, A_1', \ldots$ for $F \cup F'$ and $B \cap B', B_1, B_1', \ldots$ for $(F \cup F')^c$. Bound the total size and show the errors are $O(\varepsilon)$.

**Solution:**
Choose $\varepsilon$-good coverings: $A, A_1, \ldots$ of $F$ with size at most $\mu(F) + \varepsilon$; $B, B_1, \ldots$ of $F^c$ with size at most $1 - \mu(F) + \varepsilon$; $A', A_1', \ldots$ of $F'$ with size at most $\mu(F') + \varepsilon$; $B', B_1', \ldots$ of $F'^c$ with size at most $1 - \mu(F') + \varepsilon$.

Then $A, A', A_1, A_1', \ldots$ is a countable covering of $F \cup F'$ with size at most $\mu_0(A) + \mu_0(A') + 2\varepsilon$. Since $\mu_0(A) \leq \mu(F) + \varepsilon$ and $\mu_0(A') \leq \mu(F') + \varepsilon$, the size is at most $\mu(F) + \mu(F') + 4\varepsilon$.

Similarly, $B \cap B', B_1, B_1', \ldots$ covers $(F \cup F')^c = F^c \cap F'^c$. By Lemma 35, the errors from the "bad case" where $\mu_0(A \cup A')$ is large are controlled. After tracking all error terms (which involves bounds like $\mu_0(A' \cap B') \leq 4\varepsilon$ from Lemma 35), one obtains:

$$\mu_0^*(F \cup F') + \mu_0^*((F \cup F')^c) \leq 1 + C\varepsilon$$

for some constant $C$ (the notes get $C = 21$). Since this holds for all $\varepsilon > 0$, the sum equals 1, so by Lemma 33 we get $F \cup F' \in \mathcal{F}$.

For additivity: the covering $A \cup A'$ of $F \cup F'$ has size close to $\mu(F) + \mu(F')$ (within $O(\varepsilon)$). Since $\varepsilon$ is arbitrary, $\mu_0^*(F \cup F') = \mu(F) + \mu(F')$.
