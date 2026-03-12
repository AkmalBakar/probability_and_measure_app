---
level: 4
title: "Properties of Measures & Completions"
notes: 1
prerequisites: [3]
---

# Level 4: Properties of Measures & Completions

## Reading

Now that we have measure spaces $(X, \mathcal{F}, \mu)$, what can we actually *do* with them? This level develops the fundamental toolkit: how measures interact with limits, how to bound measures of unions, and how to extend a measure to cover sets that "should" be measurable but technically aren't.

### Combining measures

Suppose you have several measures $\mu_1, \mu_2, \ldots$ on the same measurable space $(X, \mathcal{F})$. Can you combine them into a new measure? Theorem 30 says yes: if $\alpha_i > 0$ are positive real numbers (not $\infty$), then $\mu = \sum_{i=1}^\infty \alpha_i \mu_i$ defines a measure on $\mathcal{F}$. The proof boils down to checking countable additivity, which reduces to interchanging two infinite sums of non-negative terms -- and that's justified by the rearrangement results from Level 2 (Theorem 17).

<details>
<summary>Formal Statement and Proof (Theorem 30)</summary>

**Theorem 30 (Countable linearity of measures).** Let $(X, \mathcal{F}, \mu_i)$ be a measure space for each $i \in \mathbb{N}$, and let $\alpha_i > 0$ be real numbers (not $\infty$). Then $\mu = \sum_{i=1}^\infty \alpha_i \mu_i$ is a measure on $\mathcal{F}$.

**Proof.**

1. **Step 1 — Verify $\mu(\emptyset) = 0$.** We have $\mu(\emptyset) = \sum_{i=1}^\infty \alpha_i \mu_i(\emptyset) = \sum_{i=1}^\infty \alpha_i \cdot 0 = 0$.
2. **Step 2 — Check countable additivity.** Let $A_1, A_2, \ldots \in \mathcal{F}$ be pairwise disjoint. We need to show $\mu\big(\bigcup_{j=1}^\infty A_j\big) = \sum_{j=1}^\infty \mu(A_j)$. We have $\mu\big(\bigcup_j A_j\big) = \sum_{i=1}^\infty \alpha_i \mu_i\big(\bigcup_j A_j\big) = \sum_{i=1}^\infty \alpha_i \sum_{j=1}^\infty \mu_i(A_j)$, where we used countable additivity of each $\mu_i$.
3. **Step 3 — Interchange the sums.** All terms $\alpha_i \mu_i(A_j) \geq 0$, so by Theorem 17 (rearrangement of non-negative series), we may interchange the order of summation: $\sum_{i=1}^\infty \sum_{j=1}^\infty \alpha_i \mu_i(A_j) = \sum_{j=1}^\infty \sum_{i=1}^\infty \alpha_i \mu_i(A_j) = \sum_{j=1}^\infty \mu(A_j)$.
4. **Step 4 — Handle infinite cases.** If any inner sum is $\infty$, both the original and rearranged double sums equal $\infty$, so the identity holds in all cases.

$\square$

</details>

### Continuity of measure

Theorem 31 is one of the most useful results in the course. It says that measure respects limits of monotone sequences of sets:

- **Increasing case:** If $A_1 \subseteq A_2 \subseteq \cdots$ are in $\mathcal{F}$, then $\lim_{n \to \infty} \mu(A_n) = \mu\big(\bigcup_{n \in \mathbb{N}} A_n\big)$.
- **Decreasing case:** If $B_1 \supseteq B_2 \supseteq \cdots$ are in $\mathcal{F}$ and $\mu(B_1) < \infty$, then $\lim_{n \to \infty} \mu(B_n) = \mu\big(\bigcap_{n \in \mathbb{N}} B_n\big)$.

The increasing case follows from writing the union as a disjoint union of "increments" $A_n \setminus A_{n-1}$ and applying countable additivity. The decreasing case reduces to the increasing case by taking complements relative to $B_1$. The finiteness condition $\mu(B_1) < \infty$ in the decreasing case is essential -- without it, we'd be writing $\infty - \infty$, which is not permitted.

Think of continuity of measure as the analogue of the monotone convergence theorem for sequences of real numbers: monotone + bounded (in the decreasing case) implies the limit behaves as expected.

<details>
<summary>Formal Statement and Proof (Theorem 31)</summary>

**Theorem 31 (Continuity of measure).** Let $(X, \mathcal{F}, \mu)$ be a measure space.

- **(a)** If $A_1 \subseteq A_2 \subseteq \cdots$ are in $\mathcal{F}$, then $\lim_{n \to \infty} \mu(A_n) = \mu\big(\bigcup_{n \in \mathbb{N}} A_n\big)$.
- **(b)** If $B_1 \supseteq B_2 \supseteq \cdots$ are in $\mathcal{F}$ and $\mu(B_1) < \infty$, then $\lim_{n \to \infty} \mu(B_n) = \mu\big(\bigcap_{n \in \mathbb{N}} B_n\big)$.

**Proof.**

1. **Step 1 — Increasing case: disjoint decomposition.** Define $C_1 = A_1$ and $C_n = A_n \setminus A_{n-1}$ for $n \geq 2$. The sets $C_n$ are pairwise disjoint (since $C_n \subseteq A_n \setminus A_{n-1}$ and the $A_n$ are nested), and $\bigcup_{n=1}^\infty C_n = \bigcup_{n=1}^\infty A_n$.
2. **Step 2 — Increasing case: apply countable additivity.** By countable additivity, $\mu\big(\bigcup_{n=1}^\infty A_n\big) = \mu\big(\bigcup_{n=1}^\infty C_n\big) = \sum_{n=1}^\infty \mu(C_n)$. But $\mu(A_n) = \sum_{k=1}^n \mu(C_k)$ by finite additivity (telescoping: $A_n = C_1 \cup C_2 \cup \cdots \cup C_n$, disjoint). So $\lim_{n \to \infty} \mu(A_n) = \lim_{n \to \infty} \sum_{k=1}^n \mu(C_k) = \sum_{k=1}^\infty \mu(C_k) = \mu\big(\bigcup_{n=1}^\infty A_n\big)$.
3. **Step 3 — Decreasing case: reduce to increasing.** Define $A_n = B_1 \setminus B_{n+1}$. Then $A_1 \subseteq A_2 \subseteq \cdots$ (since $B_{n+1} \supseteq B_{n+2}$ implies $B_1 \setminus B_{n+1} \subseteq B_1 \setminus B_{n+2}$), and $\bigcup_{n=1}^\infty A_n = B_1 \setminus \bigcap_{n=1}^\infty B_n$ (a point is in the union iff it is in $B_1$ but not in every $B_n$).
4. **Step 4 — Decreasing case: apply increasing case and rearrange.** By the increasing case, $\mu\big(B_1 \setminus \bigcap B_n\big) = \lim_{n \to \infty} \mu(B_1 \setminus B_{n+1})$. Since $\mu(B_1) < \infty$, we have $\mu(B_1 \setminus B_{n+1}) = \mu(B_1) - \mu(B_{n+1})$ and $\mu\big(B_1 \setminus \bigcap B_n\big) = \mu(B_1) - \mu\big(\bigcap B_n\big)$. Substituting: $\mu(B_1) - \mu\big(\bigcap B_n\big) = \lim_{n \to \infty} \big(\mu(B_1) - \mu(B_{n+1})\big) = \mu(B_1) - \lim_{n \to \infty} \mu(B_{n+1})$. Cancelling $\mu(B_1)$ (which is finite) gives $\mu\big(\bigcap B_n\big) = \lim_{n \to \infty} \mu(B_n)$.

$\square$

</details>

### The union bound (subadditivity)

For any countable collection of sets $A_i \in \mathcal{F}$ (not necessarily disjoint), we have:

$$\mu\Big(\bigcup_{i \in I} A_i\Big) \leq \sum_{i \in I} \mu(A_i).$$

This is the **union bound** (also called **countable subadditivity**), and it appears constantly in probability. The typical use case: you want to show a "bad event" has small probability, but the bad event is a complicated union of simpler events. Even if those simpler events overlap, the union bound gives you a usable upper bound by just summing their individual measures. The proof works by replacing the $A_i$ with disjoint sets $A_i \setminus (A_1 \cup \cdots \cup A_{i-1})$ and applying monotonicity and countable additivity.

<details>
<summary>Formal Statement and Proof (Union Bound)</summary>

**Union Bound (Exercise 10(c)).** For any countable index set $I$ and sets $A_i \in \mathcal{F}$ for $i \in I$:

$$\mu\Big(\bigcup_{i \in I} A_i\Big) \leq \sum_{i \in I} \mu(A_i).$$

**Proof.**

1. **Step 1 — Replace with disjoint sets.** Without loss of generality, suppose $I = \mathbb{N}$. Define $B_1 = A_1$ and $B_i = A_i \setminus (A_1 \cup \cdots \cup A_{i-1})$ for $i \geq 2$. Then the $B_i$ are pairwise disjoint and $\bigcup_{i=1}^\infty B_i = \bigcup_{i=1}^\infty A_i$.
2. **Step 2 — Bound each piece.** Since $B_i \subseteq A_i$ for each $i$, monotonicity (Exercise 10(a)) gives $\mu(B_i) \leq \mu(A_i)$.
3. **Step 3 — Apply countable additivity and comparison.** By countable additivity applied to the disjoint union: $\mu\big(\bigcup_{i=1}^\infty A_i\big) = \mu\big(\bigcup_{i=1}^\infty B_i\big) = \sum_{i=1}^\infty \mu(B_i) \leq \sum_{i=1}^\infty \mu(A_i)$. The final inequality follows from the comparison test (Theorem 19) since $0 \leq \mu(B_i) \leq \mu(A_i)$ for all $i$.

$\square$

</details>

### Inner and outer measures

Given *any* subset $S \subseteq X$ (not necessarily in $\mathcal{F}$), we can try to approximate its measure from the inside and outside using measurable sets:

- **Inner measure:** $\mu_*(S) = \sup\{\mu(A) : A \in \mathcal{F},\, A \subseteq S\}$
- **Outer measure:** $\mu^*(S) = \inf\{\mu(A) : A \in \mathcal{F},\, A \supseteq S\}$

These always exist (by the LUBP/GLBP, extended to allow $\infty$), and we always have $\mu_*(S) \leq \mu^*(S)$. When $S \in \mathcal{F}$, both equal $\mu(S)$.

<details>
<summary>Formal Statement (Inner and Outer Measure)</summary>

**Inner measure.** For any $S \subseteq X$:

$$\mu_*(S) = \sup\{\mu(A) : A \in \mathcal{F},\, A \subseteq S\}.$$

**Outer measure.** For any $S \subseteq X$:

$$\mu^*(S) = \inf\{\mu(A) : A \in \mathcal{F},\, A \supseteq S\}.$$

These are well-defined: the set $\{\mu(A) : A \in \mathcal{F}, A \subseteq S\}$ is non-empty (containing $\mu(\emptyset) = 0$) and the set $\{\mu(A) : A \in \mathcal{F}, A \supseteq S\}$ is non-empty (containing $\mu(X)$). We always have $\mu_*(S) \leq \mu^*(S)$, and when $S \in \mathcal{F}$, both equal $\mu(S)$.

</details>

A remarkable fact (Exercise 11(c)) is that the sup and inf are actually *attained*: there exists a largest measurable subset $A \subseteq S$ with $\mu(A) = \mu_*(S)$, and a smallest measurable superset $B \supseteq S$ with $\mu(B) = \mu^*(S)$. The proof uses continuity of measure (Theorem 31) and the fact that $\mathcal{F}$ is closed under countable unions/intersections.

When $\mu(X) < \infty$, there is a clean alternative formula: $\mu_*(S) = \mu(X) - \mu^*(S^c)$. This is Exercise 12, and the proof is a direct computation using the fact that $A \subseteq S$ if and only if $A^c \supseteq S^c$.

### Why we need completion

Consider Lebesgue measure on $\mathbb{R}$ with the Borel $\sigma$-algebra $\mathcal{B}(\mathbb{R})$. The Borel $\sigma$-algebra is generated by open sets, so it contains all the sets we typically encounter. But there's an annoying gap: if $N$ is a Borel set with $\mu(N) = 0$, a subset $E \subseteq N$ might not be Borel, even though it "obviously" should have measure zero.

**Measure completion** fixes this. Given $(X, \mathcal{F}, \mu)$:

1. A set $N \subseteq X$ is **$\mu$-null** if there exists $B \in \mathcal{F}$ with $\mu(B) = 0$ and $N \subseteq B$.
2. The **completed $\sigma$-algebra** $\bar{\mathcal{F}}$ consists of all sets of the form $S = A \cup N$ where $A \in \mathcal{F}$ and $N$ is $\mu$-null.
3. The **completion** $\bar{\mu}$ is defined by $\bar{\mu}(S) = \mu(A)$.

<details>
<summary>Formal Statement (Measure Completion)</summary>

**$\mu$-null set.** A set $N \subseteq X$ is $\mu$-null if there exists $B \in \mathcal{F}$ with $\mu(B) = 0$ and $N \subseteq B$.

**Completed $\sigma$-algebra.** $\bar{\mathcal{F}} = \{A \cup N : A \in \mathcal{F},\, N \text{ is } \mu\text{-null},\, A \cap N = \emptyset\}$.

**Completion of the measure.** For $S = A \cup N \in \bar{\mathcal{F}}$ (with $A \in \mathcal{F}$ and $N$ $\mu$-null, disjoint), define $\bar{\mu}(S) = \mu(A)$. This is well-defined: if $S = A \cup N = A' \cup N'$ are two such decompositions, then $\mu(A) = \mu(A')$ (proved in Exercise 13). The resulting $(X, \bar{\mathcal{F}}, \bar{\mu})$ is a complete measure space, and $\bar{\mu}$ is the unique extension of $\mu$ to $\bar{\mathcal{F}}$.

</details>

Exercise 13 verifies this is well-defined (different decompositions $S = A \cup N = A' \cup N'$ give the same value) and that $(X, \bar{\mathcal{F}}, \bar{\mu})$ is a genuine measure space with $\bar{\mu}$ the unique extension of $\mu$ to $\bar{\mathcal{F}}$.

When $\mathcal{F}$ is the Borel $\sigma$-algebra $\mathcal{B}(X, \mathcal{T})$ on a topological space, the completed $\sigma$-algebra is called the **Lebesgue $\sigma$-algebra** $\mathcal{L}(X, \mathcal{T})$, and the completion of Borel measure is the **Lebesgue measure** $\lambda : \mathcal{L}(X) \to \mathbb{R}_{\geq 0}^\infty$.

The payoff: when $\mu(X) < \infty$, Exercise 14 gives a clean characterisation of the completed $\sigma$-algebra:

$$\bar{\mathcal{F}} = \{S \subseteq X : \mu_*(S) = \mu^*(S)\}.$$

A set is in the completed $\sigma$-algebra precisely when its inner and outer measures agree -- there is no "gap" between the best measurable approximations from inside and outside.

## Key Results

### theorem: Countable linearity of measures
**Number:** Theorem 30
**Plain English:** You can build new measures by taking positive linear combinations (even countably infinite ones) of existing measures on the same space.
**Formal:** Let $(X, \mathcal{F}, \mu_i)$ be a measure space for each $i \in \mathbb{N}$, and let $\alpha_i > 0$ be real numbers (not $\infty$). Then $\mu = \sum_{i=1}^\infty \alpha_i \mu_i$ is a measure on $\mathcal{F}$.
**Proof:**
1. **Step 1 — Verify $\mu(\emptyset) = 0$.** $\mu(\emptyset) = \sum_{i=1}^\infty \alpha_i \mu_i(\emptyset) = \sum_{i=1}^\infty \alpha_i \cdot 0 = 0$.
2. **Step 2 — Set up countable additivity.** Let $A_1, A_2, \ldots \in \mathcal{F}$ be pairwise disjoint. We need $\mu\big(\bigcup_{j=1}^\infty A_j\big) = \sum_{j=1}^\infty \mu(A_j)$. By definition, $\mu\big(\bigcup_j A_j\big) = \sum_{i=1}^\infty \alpha_i \mu_i\big(\bigcup_j A_j\big) = \sum_{i=1}^\infty \alpha_i \sum_{j=1}^\infty \mu_i(A_j)$, using countable additivity of each $\mu_i$.
3. **Step 3 — Interchange the sums.** All terms $\alpha_i \mu_i(A_j) \geq 0$, so Theorem 17 (rearrangement of non-negative series) justifies the interchange: $\sum_{i=1}^\infty \sum_{j=1}^\infty \alpha_i \mu_i(A_j) = \sum_{j=1}^\infty \sum_{i=1}^\infty \alpha_i \mu_i(A_j) = \sum_{j=1}^\infty \mu(A_j)$.
4. **Step 4 — Handle infinite cases.** If any inner sum is $\infty$, both the original and rearranged double sums equal $\infty$, so the identity holds in all cases. $\square$
**Key technique:** Interchange of summation for non-negative series
**Load-bearing:** no

### theorem: Continuity of measure
**Number:** Theorem 31
**Plain English:** If sets grow toward a limit (increasing sequence) or shrink toward a limit (decreasing sequence, with finite starting measure), the measure converges to the measure of the limit set.
**Formal:** Let $(X, \mathcal{F}, \mu)$ be a measure space. If $A_1 \subseteq A_2 \subseteq \cdots$ are in $\mathcal{F}$, then $\lim_{n \to \infty} \mu(A_n) = \mu\big(\bigcup_{n \in \mathbb{N}} A_n\big)$. If $B_1 \supseteq B_2 \supseteq \cdots$ are in $\mathcal{F}$ and $\mu(B_1) < \infty$, then $\lim_{n \to \infty} \mu(B_n) = \mu\big(\bigcap_{n \in \mathbb{N}} B_n\big)$.
**Proof:**
1. **Step 1 — Increasing case: disjoint decomposition.** Define $C_1 = A_1$ and $C_n = A_n \setminus A_{n-1}$ for $n \geq 2$. The sets $C_n$ are pairwise disjoint and $\bigcup_{n=1}^\infty C_n = \bigcup_{n=1}^\infty A_n$.
2. **Step 2 — Increasing case: apply countable additivity.** By countable additivity, $\mu\big(\bigcup_{n=1}^\infty A_n\big) = \sum_{n=1}^\infty \mu(C_n)$. By finite additivity (telescoping), $\mu(A_n) = \sum_{k=1}^n \mu(C_k)$. Therefore $\lim_{n \to \infty} \mu(A_n) = \sum_{k=1}^\infty \mu(C_k) = \mu\big(\bigcup_{n=1}^\infty A_n\big)$.
3. **Step 3 — Decreasing case: reduce to increasing.** Define $A_n = B_1 \setminus B_{n+1}$. Then $A_1 \subseteq A_2 \subseteq \cdots$ and $\bigcup_{n=1}^\infty A_n = B_1 \setminus \bigcap_{n=1}^\infty B_n$.
4. **Step 4 — Decreasing case: apply increasing case and rearrange.** By the increasing case, $\mu\big(B_1 \setminus \bigcap B_n\big) = \lim_{n \to \infty} \mu(B_1 \setminus B_{n+1})$. Since $\mu(B_1) < \infty$, we can write $\mu(B_1 \setminus B_{n+1}) = \mu(B_1) - \mu(B_{n+1})$ and $\mu\big(B_1 \setminus \bigcap B_n\big) = \mu(B_1) - \mu\big(\bigcap B_n\big)$. Substituting and cancelling $\mu(B_1)$ (finite) gives $\mu\big(\bigcap_{n=1}^\infty B_n\big) = \lim_{n \to \infty} \mu(B_n)$. $\square$
**Key technique:** Disjoint decomposition + countable additivity
**Load-bearing:** yes

### proposition: Union bound (countable subadditivity)
**Number:** Exercise 10(c)
**Plain English:** The measure of a union is at most the sum of the individual measures -- even when the sets overlap.
**Formal:** For any countable index set $I$ and sets $A_i \in \mathcal{F}$ for $i \in I$: $\mu\big(\bigcup_{i \in I} A_i\big) \leq \sum_{i \in I} \mu(A_i)$.
**Proof:**
1. **Step 1 — Replace with disjoint sets.** Without loss of generality, suppose $I = \mathbb{N}$. Define $B_1 = A_1$ and $B_i = A_i \setminus (A_1 \cup \cdots \cup A_{i-1})$ for $i \geq 2$. The sets $B_i$ are pairwise disjoint and $\bigcup_{i=1}^\infty B_i = \bigcup_{i=1}^\infty A_i$.
2. **Step 2 — Bound each piece.** Since $B_i \subseteq A_i$ for each $i$, monotonicity (Exercise 10(a)) gives $\mu(B_i) \leq \mu(A_i)$.
3. **Step 3 — Apply countable additivity and comparison.** By countable additivity applied to the disjoint union: $\mu\big(\bigcup_{i=1}^\infty A_i\big) = \sum_{i=1}^\infty \mu(B_i) \leq \sum_{i=1}^\infty \mu(A_i)$. The inequality follows from the comparison test (Theorem 19) since $0 \leq \mu(B_i) \leq \mu(A_i)$ for all $i$. $\square$
**Key technique:** Replace overlapping sets with disjoint ones
**Load-bearing:** yes

### definition: Inner and outer measure
**Number:** (p.22, unnumbered)
**Plain English:** The inner measure of any set $S$ is the largest measure achievable by a measurable subset of $S$; the outer measure is the smallest measure achievable by a measurable superset of $S$.
**Formal:** For any $S \subseteq X$: $\mu_*(S) = \sup\{\mu(A) : A \in \mathcal{F},\, A \subseteq S\}$ and $\mu^*(S) = \inf\{\mu(A) : A \in \mathcal{F},\, A \supseteq S\}$.
**Load-bearing:** yes

### proposition: Inner measure alternative formula
**Number:** Exercise 12
**Plain English:** When the total measure is finite, inner measure equals total measure minus outer measure of the complement.
**Formal:** If $\mu(X) < \infty$, then $\mu_*(S) = \mu(X) - \mu^*(S^c)$ for all $S \subseteq X$.
**Load-bearing:** yes

### definition: Mu-null set
**Number:** (p.24, unnumbered)
**Plain English:** A set is $\mu$-null if it is contained in a measurable set of measure zero -- it has "zero size" even if it's not itself in the $\sigma$-algebra.
**Formal:** $N \subseteq X$ is $\mu$-null if there exists $B \in \mathcal{F}$ with $\mu(B) = 0$ and $N \subseteq B$.
**Load-bearing:** yes

### definition: Measure completion
**Number:** (p.24, unnumbered)
**Plain English:** The completion enlarges the $\sigma$-algebra by adding all subsets of null sets, and extends the measure in the only sensible way.
**Formal:** If $S = A \cup N$ where $A \in \mathcal{F}$ and $N$ is $\mu$-null, with the union disjoint, then $S \in \bar{\mathcal{F}}$ and $\bar{\mu}(S) = \mu(A)$. The resulting $(X, \bar{\mathcal{F}}, \bar{\mu})$ is a complete measure space.
**Load-bearing:** yes

### definition: Lebesgue sigma-algebra and Lebesgue measure
**Number:** (p.24/26, unnumbered)
**Plain English:** The Lebesgue $\sigma$-algebra is the completion of the Borel $\sigma$-algebra with respect to Borel measure; it is strictly larger than $\mathcal{B}(\mathbb{R})$. The Lebesgue measure $\lambda$ is the completed measure.
**Formal:** If $\mathcal{F} = \mathcal{B}(X, \mathcal{T})$ is a Borel $\sigma$-algebra, the completion is the Lebesgue $\sigma$-algebra $\mathcal{L}(X, \mathcal{T})$, and the completion of the Borel measure $\mu$ is the Lebesgue measure $\lambda : \mathcal{L}(X) \to \mathbb{R}_{\geq 0}^\infty$.
**Load-bearing:** yes

### theorem: Characterisation of completed sigma-algebra
**Number:** Exercise 14
**Plain English:** When the total measure is finite, a set belongs to the completed $\sigma$-algebra if and only if its inner and outer measures agree.
**Formal:** If $(X, \mathcal{F}, \mu)$ is a measure space with $\mu(X) < \infty$, then $\bar{\mathcal{F}} = \{S \subseteq X : \mu_*(S) = \mu^*(S)\}$.
**Load-bearing:** yes

## Exercises

### exercise: Monotonicity of measure
**Number:** Exercise 10(a)
**Difficulty:** warm-up
**Tags:** measure, monotonicity, set-inclusion

**Question:**
Let $(X, \mathcal{F}, \mu)$ be a measure space, and suppose $A, B \in \mathcal{F}$. Prove that if $A \subseteq B$ then $\mu(A) \leq \mu(B)$.

**Hint 1:** Decompose $B$ into disjoint pieces
Write $B = A \cup (B \setminus A)$. What does finite additivity tell you?

**Hint 2:** Use non-negativity of measure
$\mu(B) = \mu(A) + \mu(B \setminus A)$, and $\mu(B \setminus A) \geq 0$.

**Solution:**
We have $B = A \cup (B \setminus A)$, a disjoint union. By finite additivity (which follows from countable additivity), $\mu(B) = \mu(A) + \mu(B \setminus A)$. Since $\mu(B \setminus A) \geq 0$ by definition of a measure, we conclude $\mu(A) \leq \mu(B)$.

### exercise: Complement formula for measure
**Number:** Exercise 10(b)
**Difficulty:** warm-up
**Tags:** measure, complement, finite-measure

**Question:**
Let $(X, \mathcal{F}, \mu)$ be a measure space, and suppose $A \in \mathcal{F}$ with $\mu(A) < \infty$. Prove that $\mu(X \setminus A) = \mu(X) - \mu(A)$.

**Hint 1:** Decompose $X$ into $A$ and its complement
$X = A \cup (X \setminus A)$ is a disjoint union.

**Hint 2:** Rearrange using finiteness
Additivity gives $\mu(X) = \mu(A) + \mu(X \setminus A)$. Since $\mu(A) < \infty$, you can subtract it from both sides (you can't do this if $\mu(A) = \infty$ because $\infty - \infty$ is undefined).

**Solution:**
We have $X = A \cup (X \setminus A)$, disjoint. By countable additivity, $\mu(X) = \mu(A) + \mu(X \setminus A)$. Since $\mu(A) < \infty$ (a real number), we can rearrange to get $\mu(X \setminus A) = \mu(X) - \mu(A)$.

### exercise: Union bound (countable subadditivity)
**Number:** Exercise 10(c)
**Difficulty:** standard
**Tags:** measure, union-bound, subadditivity

**Question:**
Let $(X, \mathcal{F}, \mu)$ be a measure space. For any countable index set $I$ and sets $A_i \in \mathcal{F}$ for $i \in I$, prove that:

$$\mu\Big(\bigcup_{i \in I} A_i\Big) \leq \sum_{i \in I} \mu(A_i).$$

**Hint 1:** Make the union disjoint
Replace each $A_i$ with $A_i \setminus (A_1 \cup \cdots \cup A_{i-1})$. The new sets are disjoint with the same union.

**Hint 2:** Apply monotonicity to each piece
Each $b_i = \mu(A_i \setminus (A_1 \cup \cdots \cup A_{i-1})) \leq \mu(A_i)$ by Exercise 10(a), since $A_i \setminus (\cdots) \subseteq A_i$. Now apply countable additivity to the disjoint union and use the comparison test (Theorem 19).

**Solution:**
Without loss of generality, suppose $I = \mathbb{N}$. Let $a_i = \mu(A_i)$ and $b_i = \mu\big(A_i \setminus (A_1 \cup A_2 \cup \cdots \cup A_{i-1})\big)$. By Exercise 10(a), since $A_i \setminus (A_1 \cup \cdots \cup A_{i-1}) \subseteq A_i$, we have $b_i \leq a_i$. The sets $A_i \setminus (A_1 \cup \cdots \cup A_{i-1})$ are pairwise disjoint, and their union equals $\bigcup_{i \in I} A_i$. By countable additivity:

$$\mu\Big(\bigcup_{i \in I} A_i\Big) = \sum_{i=1}^\infty b_i \leq \sum_{i=1}^\infty a_i = \sum_{i \in I} \mu(A_i).$$

The inequality $\sum b_i \leq \sum a_i$ follows from the comparison test (Theorem 19) since $0 \leq b_i \leq a_i$.

### exercise: Existence of inner and outer measures
**Number:** Exercise 11(a)
**Difficulty:** standard
**Tags:** inner-measure, outer-measure, LUBP, GLBP

**Question:**
Prove that the inner measure $\mu_*(S)$ and outer measure $\mu^*(S)$ exist for every $S \subseteq X$. Recall that $\infty$ is not a number and so cannot be in a set to which the LUBP or GLBP is applied.

**Hint 1:** Show the relevant sets of real numbers are non-empty
For $\mu_*(S)$: the set $\{\mu(A) : A \in \mathcal{F}, A \subseteq S\}$ contains $\mu(\emptyset) = 0$, so it's non-empty. For $\mu^*(S)$: the set $\{\mu(A) : A \in \mathcal{F}, A \supseteq S\}$ contains $\mu(X)$, so it's non-empty.

**Hint 2:** Handle the case where the set contains $\infty$ separately
If any $A \in \mathcal{F}$ with $A \subseteq S$ has $\mu(A) = \infty$, then $\mu_*(S) = \infty$ by the extended definition of sup. Otherwise, the set of values is a non-empty subset of $\mathbb{R}$ bounded below by 0, and LUBP applies. Similarly for outer measure using GLBP.

**Solution:**
For $\mu_*(S)$: let $\mathcal{G} = \{A \in \mathcal{F} : A \subseteq S\}$. Since $\emptyset \in \mathcal{G}$, we know $\mathcal{G}$ is non-empty. Let $G = \{\mu(A) : A \in \mathcal{G}\}$. If there is $A \in \mathcal{G}$ with $\mu(A) = \infty$, then by the extended definition of sup, $\mu_*(S) = \infty$ exists. If no such $A$ exists, then $G$ is a non-empty set of real numbers with $0 \in G$. If $G$ has no upper bound, then $\mu_*(S) = \infty$ exists. If $G$ does have an upper bound, the LUBP gives $\sup(G) = \mu_*(S)$ exists.

For $\mu^*(S)$: let $G = \{\mu(A) : A \in \mathcal{F}, S \subseteq A\}$. This is non-empty since $\mu(X) \in G$. If there are no $A \in \mathcal{F}$ with $S \subseteq A$ and $\mu(A) < \infty$, then $\mu^*(S) = \infty$ exists. Otherwise, taking the subset of finite values in $G$, we have a non-empty set of real numbers bounded below by 0, so the GLBP gives $\inf(G) = \mu^*(S)$ exists.

### exercise: Inner/outer measure of measurable sets and ordering
**Number:** Exercise 11(b)
**Difficulty:** standard
**Tags:** inner-measure, outer-measure, measurable-sets

**Question:**
Prove that if $S \in \mathcal{F}$ then $\mu_*(S) = \mu^*(S) = \mu(S)$. Prove also that for all $S \subseteq X$ we have $\mu_*(S) \leq \mu^*(S)$.

**Hint 1:** For the first part, $S$ is itself a valid candidate
$S \in \mathcal{F}$ with $S \subseteq S$ and $S \supseteq S$, so $\mu(S)$ appears in both the sup and inf defining $\mu_*(S)$ and $\mu^*(S)$.

**Hint 2:** For the inequality, use a "sandwich" argument
If $\mu_*(S)$ is finite, suppose for contradiction $\mu_*(S) > \mu^*(S)$. Pick $a, b$ with $\mu^*(S) < a < b < \mu_*(S)$. Then there exist $A \subseteq S \subseteq B$ with $\mu(A) \geq b > a \geq \mu(B)$. But $A \subseteq B$ gives $\mu(A) \leq \mu(B)$ by Exercise 10(a), a contradiction.

**Solution:**
If $S \in \mathcal{F}$, then $S$ itself satisfies $S \subseteq S$ and $S \supseteq S$, so $\mu(S)$ is a lower bound for $\{\mu(A) : A \supseteq S, A \in \mathcal{F}\}$ (by monotonicity, any $A \supseteq S$ has $\mu(A) \geq \mu(S)$) and an upper bound for $\{\mu(A) : A \subseteq S, A \in \mathcal{F}\}$. Hence $\mu_*(S) = \mu(S) = \mu^*(S)$.

For any $S \subseteq X$: if $\mu_*(S) = \infty$ and $\mu^*(S)$ is finite, we need a contradiction. Suppose $\mu_*(S)$ is finite. Consider $\min\big(\frac{1}{2}(\mu(S_{\text{lower}}) + \mu_*(S)), 1\big)$ -- actually, more directly: if $\mu_*(S) > \mu^*(S)$, pick $a$ with $\mu^*(S) < a < \mu_*(S)$. By definitions, there exist $A \in \mathcal{F}$ with $A \subseteq S$ and $\mu(A) > a$, and $B \in \mathcal{F}$ with $B \supseteq S$ and $\mu(B) < a$. But $A \subseteq S \subseteq B$ gives $\mu(A) \leq \mu(B)$ by Exercise 10(a), so $a < \mu(A) \leq \mu(B) < a$, a contradiction. If $\mu_*(S) = \infty$, then for any $M$ there exists $A \subseteq S$ with $\mu(A) > M$, and any $B \supseteq S$ satisfies $\mu(B) \geq \mu(A) > M$, so $\mu^*(S) = \infty$ too.

### exercise: Inner/outer measure attained
**Number:** Exercise 11(c)
**Difficulty:** challenge
**Tags:** inner-measure, outer-measure, continuity-of-measure, attainment

**Question:**
Prove that the sup and inf in the definitions of inner and outer measure are in fact max and min, respectively. That is, there exists $A \in \mathcal{F}$ with $A \subseteq S$ and $\mu_*(S) = \mu(A)$, and similarly $B \in \mathcal{F}$ with $B \supseteq S$ and $\mu^*(S) = \mu(B)$.

*Hint from notes: this proof needs engagement with the analysis definition. If your proof seems to identify a largest (by set inclusion) $A$ such that $\mu_*(S) = \mu(A)$, it is wrong.*

**Hint 1:** Approximate using sequences and take limits
For $\mu^*(S)$: if $\mu^*(S) = c < \infty$, for each $n$ pick $A_n \in \mathcal{F}$ with $S \subseteq A_n$ and $\mu(A_n) \leq c + \frac{1}{n}$. Consider $A = \bigcap_{n \in \mathbb{N}} A_n$.

**Hint 2:** Use continuity of measure (Theorem 31)
Let $B_n = A_1 \cap A_2 \cap \cdots \cap A_n$. Then $B_n$ is decreasing, $S \subseteq B_n$ for all $n$, and $\mu(B_1) \leq c + 1 < \infty$. By Theorem 31, $\mu(\bigcap B_n) = \lim \mu(B_n) \leq \lim (c + \frac{1}{n}) = c$. Since $S \subseteq \bigcap B_n$, also $\mu(\bigcap B_n) \geq c$. For $\mu_*(S)$: use an analogous increasing sequence and Theorem 31.

**Solution:**
*For $\mu^*(S)$:* If $\mu^*(S) = \infty$, then $X$ is the required set. If $\mu^*(S) = c < \infty$, for each $n \in \mathbb{N}$ choose $A_n \in \mathcal{F}$ with $S \subseteq A_n$ and $\mu(A_n) \leq c + \frac{1}{n}$. Let $B_n = A_1 \cap \cdots \cap A_n$. Then $B_1 \supseteq B_2 \supseteq \cdots$, each $B_n \in \mathcal{F}$, $S \subseteq B_n$, and $\mu(B_n) \leq \mu(A_n) \leq c + \frac{1}{n}$. Also $\mu(B_1) \leq c + 1 < \infty$. Let $A = \bigcap_{n \in \mathbb{N}} B_n$. By Theorem 31 (decreasing case), $\mu(A) = \lim \mu(B_n) \leq c$. Since $S \subseteq A$, we have $\mu(A) \geq \mu^*(S) = c$. Hence $\mu(A) = c = \mu^*(S)$, and $A \supseteq S$ as required.

*For $\mu_*(S)$:* If $\mu_*(S) = \infty$, either there is $A \in \mathcal{F}$ with $A \subseteq S$ and $\mu(A) = \infty$ (done), or for each $n$ there is $A_n \in \mathcal{F}$ with $A_n \subseteq S$ and $\mu(A_n) > n$. Let $A = \bigcup_{n \in \mathbb{N}} A_n$. Then $A \subseteq S$ (but we need $A \in \mathcal{F}$... $A \in \mathcal{F}$ since $\mathcal{F}$ is a $\sigma$-algebra). By monotonicity $\mu(A) \geq \mu(A_n) > n$ for all $n$, so $\mu(A) = \infty$.

If $\mu_*(S) = d < \infty$, for each $n$ choose $A_n \in \mathcal{F}$ with $A_n \subseteq S$ and $\mu(A_n) \geq d - \frac{1}{n}$. Let $C_n = A_1 \cup \cdots \cup A_n$. Then $C_1 \subseteq C_2 \subseteq \cdots$, each $C_n \in \mathcal{F}$, $C_n \subseteq S$, and $\mu(C_n) \geq \mu(A_n) \geq d - \frac{1}{n}$. Note $\mu(A_1) < \infty$ (since $d < \infty$). Let $A = \bigcup_{n \in \mathbb{N}} C_n$. By Theorem 31 (increasing case), $\mu(A) = \lim \mu(C_n) \geq d$. Since $A \subseteq S$, we have $\mu(A) \leq \mu_*(S) = d$. Hence $\mu(A) = d = \mu_*(S)$.

### exercise: Alternative inner measure formula
**Number:** Exercise 12
**Difficulty:** standard
**Tags:** inner-measure, outer-measure, complement, finite-measure

**Question:**
Prove that if $\mu(X) < \infty$, then $\mu_*(S) = \mu(X) - \mu^*(S^c)$ for all $S \subseteq X$.

**Hint 1:** Relate the sets in the two definitions via complements
If $A \in \mathcal{F}$ with $A \subseteq S$, then $A^c \in \mathcal{F}$ with $A^c \supseteq S^c$. So taking the complement gives a bijection between "measurable subsets of $S$" and "measurable supersets of $S^c$."

**Hint 2:** Use the complement formula for measures
For $A \in \mathcal{F}$ with $\mu(A) < \infty$ (guaranteed since $\mu(X) < \infty$): $\mu(A) = \mu(X) - \mu(A^c)$. So supremising $\mu(A)$ over $A \subseteq S$ is the same as infimising $\mu(A^c)$ over $A^c \supseteq S^c$.

**Solution:**
Since $\mu(X) < \infty$, every set in $\mathcal{F}$ has finite measure. For any $A \in \mathcal{F}$, we have $\mu(X) = \mu(A) + \mu(A^c)$ by additivity, so $\mu(A) = \mu(X) - \mu(A^c)$.

Now $A \subseteq S$ if and only if $S^c \subseteq A^c$. The map $A \mapsto A^c$ is a bijection from $\{A \in \mathcal{F} : A \subseteq S\}$ to $\{B \in \mathcal{F} : B \supseteq S^c\}$. Therefore:

$$\mu_*(S) = \sup_{A \in \mathcal{F},\, A \subseteq S} \mu(A) = \sup_{A \in \mathcal{F},\, A \subseteq S} \big(\mu(X) - \mu(A^c)\big) = \mu(X) - \inf_{B \in \mathcal{F},\, B \supseteq S^c} \mu(B) = \mu(X) - \mu^*(S^c).$$

The third equality uses the fact that $\sup(-f) = -\inf(f)$ and $\mu(X)$ is a finite constant.

### exercise: Completion is well-defined and a measure space
**Number:** Exercise 13
**Difficulty:** standard
**Tags:** completion, well-defined, measure-space, uniqueness

**Question:**
(Part 1) Fill in the details: check that $\bar{\mu}$ is well-defined. (There may be many different ways to write $S = A \cup N$ as a disjoint union of a measurable set and a $\mu$-null set.)

(Part 2) Prove that if $(X, \mathcal{F}, \mu)$ is any measure space, the completion $(X, \bar{\mathcal{F}}, \bar{\mu})$ is a measure space.

(Part 3) Prove that $\bar{\mu}$ is the unique measure on $\bar{\mathcal{F}}$ whose restriction $\bar{\mu}|_{\mathcal{F}}$ to $\mathcal{F}$ is $\mu$.

**Hint 1:** For well-definedness, sandwich between two measurable sets of equal measure
If $S = A \cup N = A' \cup N'$, show $A \setminus (A \cap B) \subseteq N' \cup$ something null, where $B$ bounds $N$. Use Exercise 10(a) and 10(c) to conclude $\mu(A) = \mu(A')$.

**Hint 2:** For uniqueness, bound $\mu'(S)$ from both sides
If $\mu'$ is any measure on $\bar{\mathcal{F}}$ with $\mu'|_\mathcal{F} = \mu$, write $S = A \cup N$ with $N \subseteq B$ and $\mu(B) = 0$. Then $\mu(A) = \mu'(A) \leq \mu'(A \cup N) \leq \mu'(A \cup B) = \mu'(A) + \mu'(B \setminus A) \leq \mu(A) + \mu(B) = \mu(A)$.

**Solution:**
*Well-definedness:* Suppose $S = A \cup N = A' \cup N'$ are two disjoint decompositions, where $A, A' \in \mathcal{F}$ and $N \subseteq B$, $N' \subseteq B'$ with $\mu(B) = \mu(B') = 0$. We need $\mu(A) = \mu(A')$.

We have $A \setminus (A \cap B') \subseteq A' \cup N' \subseteq A' \cup B'$. So by Exercise 10(a) and 10(c): $\mu(A) - \mu(A \cap B') \leq \mu(A' \cup B') \leq \mu(A') + \mu(B') = \mu(A')$. But $\mu(A \cap B') \leq \mu(B') = 0$, so $\mu(A) \leq \mu(A')$. By symmetry, $\mu(A') \leq \mu(A)$, hence $\mu(A) = \mu(A')$.

*$\bar{\mathcal{F}}$ is a $\sigma$-algebra:* We verify closure under complement and countable union.

- *Complement:* If $S = A \cup N$ with $N \subseteq B$, $\mu(B) = 0$, then $S^c = X \setminus (A \cup N_1) = (X \setminus (A \cup B_1)) \cup (B_1 \setminus N)$. More precisely, $S_1^c = X \setminus (A_1 \cup N_1)$. Now $X \setminus (A_1 \cup B_1)$ is in $\mathcal{F}$, and $B_1 \setminus N_1 \subseteq B_1$ is null. So $S^c = (X \setminus (A \cup B)) \cup (B \setminus N)$. Here $X \setminus (A \cup B) \in \mathcal{F}$ and $B \setminus N \subseteq B$ is $\mu$-null. So $S^c \in \bar{\mathcal{F}}$.

- *Countable union:* Let $S_n = A_n \cup N_n$ with $N_n \subseteq B_n$, $\mu(B_n) = 0$. Then $\bigcup S_n = \bigcup A_n \cup \bigcup N_n$. We have $\bigcup A_n \in \mathcal{F}$ and $\bigcup N_n \subseteq \bigcup B_n$ with $\mu(\bigcup B_n) \leq \sum \mu(B_n) = 0$. So $\bigcup S_n \in \bar{\mathcal{F}}$.

*$\bar{\mu}$ is countably additive:* Let $S_n = A_n \cup N_n$ be pairwise disjoint. Then the $A_n$ are pairwise disjoint (since $A_n \subseteq S_n$). So $\bar{\mu}(\bigcup S_n) = \mu(\bigcup A_n) = \sum \mu(A_n) = \sum \bar{\mu}(S_n)$.

*Uniqueness:* Let $\mu'$ be any measure on $\bar{\mathcal{F}}$ with $\mu'|_\mathcal{F} = \mu$. For $S = A \cup N$ with $N \subseteq B$, $\mu(B) = 0$: $\mu(A) = \mu'(A) \leq \mu'(A \cup N) \leq \mu'(A \cup B) \leq \mu'(A) + \mu'(B) = \mu(A) + 0 = \mu(A)$. So $\mu'(S) = \mu(A) = \bar{\mu}(S)$.

### exercise: Characterisation of completed sigma-algebra
**Number:** Exercise 14
**Difficulty:** challenge
**Tags:** completion, inner-measure, outer-measure, finite-measure

**Question:**
Prove that if $(X, \mathcal{F}, \mu)$ is any measure space with $\mu(X) < \infty$, then:

$$\bar{\mathcal{F}} = \{S \subseteq X : \mu_*(S) = \mu^*(S)\}.$$

Explain what goes wrong with this if $\mu(X) = \infty$.

**Hint 1:** Show both inclusions separately
$(\subseteq)$: If $S \in \bar{\mathcal{F}}$, write $S = A \cup N$ with $N$ null, and show $\mu_*(S) = \mu^*(S) = \mu(A)$.
$(\supseteq)$: If $\mu_*(S) = \mu^*(S)$, use Exercise 11(c) to get $A \subseteq S \subseteq B$ with $\mu(A) = \mu(B)$.

**Hint 2:** For the reverse inclusion, show the gap $B \setminus A$ is null
From Exercise 11(c), get $A, B \in \mathcal{F}$ with $A \subseteq S \subseteq B$ and $\mu(A) = \mu_*(S) = \mu^*(S) = \mu(B)$. Then $\mu(B \setminus A) = \mu(B) - \mu(A) = 0$ (since $\mu(X) < \infty$). Let $N = S \setminus A \subseteq B \setminus A$, so $N$ is null, and $S = A \cup N$.

**Solution:**
$(\subseteq)$: Let $S \in \bar{\mathcal{F}}$, so $S = A \cup N$ where $A \in \mathcal{F}$ and $N \subseteq B$ with $\mu(B) = 0$. Then $A \subseteq S \subseteq A \cup B$, so:

$$\mu(A) \leq \mu_*(S) \leq \mu^*(S) \leq \mu(A \cup B) \leq \mu(A) + \mu(B) = \mu(A).$$

Here we used Exercise 11(b) for $\mu_*(S) \leq \mu^*(S)$, and Exercise 10(a) and 10(c) for the outer bounds. So $\mu_*(S) = \mu^*(S) = \mu(A)$.

$(\supseteq)$: Suppose $\mu_*(S) = \mu^*(S)$. By Exercise 11(c), there exist $A, B \in \mathcal{F}$ with $A \subseteq S \subseteq B$, $\mu(A) = \mu_*(S)$, and $\mu(B) = \mu^*(S)$. Since $\mu_*(S) = \mu^*(S)$, we have $\mu(A) = \mu(B)$. Since $A \subseteq B$ and $\mu(A) \leq \mu(X) < \infty$, we get $\mu(B \setminus A) = \mu(B) - \mu(A) = 0$. Letting $N = S \setminus A$, we have $N \subseteq B \setminus A$, so $N$ is $\mu$-null, and $S = A \cup N \in \bar{\mathcal{F}}$.

*What goes wrong when $\mu(X) = \infty$:* The Vitali set $V$ is not Lebesgue measurable, so $V \notin \bar{\mathcal{F}}$ for Lebesgue measure on $\mathbb{R}$. However, $V \cup [10, \infty)$ has both inner and outer measure $\infty$ (since it contains $[10, \infty)$), yet $V \cup [10, \infty)$ is not in the Lebesgue $\sigma$-algebra (if it were, and since $[10, \infty)$ is measurable, $V$ would be measurable by taking the difference). So the set $\{S : \mu_*(S) = \mu^*(S)\}$ contains sets not in $\bar{\mathcal{F}}$ when $\mu(X) = \infty$ -- the equality of inner and outer measures is necessary but not sufficient.
