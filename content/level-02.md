---
level: 2
title: "Random Variables, Expectation & Analysis Background"
notes: 1
prerequisites: [1]
---

# Level 2: Random Variables, Expectation & Analysis Background

## Reading

This level covers two things: the basics of random variables and expectation in the discrete setting, and the background from real analysis that we'll need for measure theory. The analysis material (cardinality, series, compactness) is the foundation on which everything from Level 4 onward is built.

### Random variables and expectation

Suppose $\Omega$ is finite. A function $X : \Omega \to \mathbb{R}$ is called a **random variable**. Despite the name, there is nothing "random" about it — it's just a function. The randomness comes from the probability space $(\Omega, \mathcal{F}, \mathbb{P})$.

The **expectation** of $X$ is defined as:

$$\mathbb{E}(X) = \sum_{\omega \in \Omega} X(\omega) \, \mathbb{P}(\{\omega\}).$$

This is well-defined when $\Omega$ is finite (we're implicitly assuming $\{\omega\} \in \mathcal{F}$).

**Linearity of expectation** is the most important property: for any random variables $X, Y$ on $\Omega$ and constants $\alpha, \beta \in \mathbb{R}$:

$$\mathbb{E}(\alpha X + \beta Y) = \alpha \mathbb{E}(X) + \beta \mathbb{E}(Y).$$

This follows directly from writing out the definition (since $\Omega$ is finite, there are no convergence issues). Linearity holds *regardless* of whether $X$ and $Y$ are independent.

### A probabilistic proof: the antichain bound

Here's a beautiful application of expectation. An **antichain** $\mathcal{S}$ is a collection of subsets of $\{1, 2, \ldots, n\}$ such that no set contains another: if $S, S' \in \mathcal{S}$ and $S \subseteq S'$, then $S = S'$.

**Theorem 8.** For any antichain $\mathcal{S} \subseteq \mathcal{P}(\{1, \ldots, n\})$:
$$\sum_{S \in \mathcal{S}} \binom{n}{|S|}^{-1} \leq 1.$$

*Proof idea.* Pick a uniform random permutation $\pi$ of $\{1, \ldots, n\}$. Define $C_i = \{\pi(1), \ldots, \pi(i)\}$ and let $X = |\{i : C_i \in \mathcal{S}\}|$. Since $\mathcal{S}$ is an antichain, $X \leq 1$. Write $X = \sum_{S \in \mathcal{S}} \mathbf{1}_S$ where $\mathbf{1}_S$ is 1 if $C_{|S|} = S$. By linearity, $\mathbb{E}(X) = \sum_{S \in \mathcal{S}} \mathbb{E}(\mathbf{1}_S) = \sum_{S \in \mathcal{S}} \binom{n}{|S|}^{-1} \leq 1$.

The technique here — writing a complicated random variable as a sum of indicators and applying linearity — is used throughout probability.

### Cardinality

A set $S$ is **countable** if there is a bijection between $S$ and a subset of $\mathbb{N}$. Key facts:

- A countable union of countable sets is countable (Theorem 12 — by the diagonal enumeration argument).
- $\mathbb{R}$ is **uncountable** (Theorem 13 — Cantor's diagonal argument).
- For any set $S$, $|S| < |\mathcal{P}(S)|$ (Theorem 14 — the set $T = \{s \in S : s \notin f(s)\}$ gives a contradiction for any bijection $f : S \to \mathcal{P}(S)$). In particular, $\mathcal{P}(\mathbb{R})$ is bigger than $\mathbb{R}$.

These facts matter because they tell us that $\mathbb{R}$ has "too many" subsets to assign probabilities to all of them — motivating $\sigma$-algebras.

### Series and limits

A sequence $(a_n)$ **tends to a limit** $L$ if: $\forall \varepsilon > 0$, $\exists N \in \mathbb{N}$, $\forall n > N$: $|a_n - L| < \varepsilon$.

A series $\sum_{i=1}^\infty b_i$ means the limit of its partial sums $\sum_{i=1}^n b_i$, if it exists. Key results:

- **Absolute convergence and rearrangement (Theorem 17):** If $\sum b_i$ is absolutely convergent, then any rearrangement converges to the same limit. Also, if we have convergent series of non-negative terms $a_{i,j}$, the diagonal enumeration series converges to the same limit.
- **Conditionally convergent rearrangement (Theorem 18):** If $\sum c_n$ converges but not absolutely, its terms can be rearranged to give any limit $x \in \mathbb{R}$.
- **Comparison test (Theorem 19):** If $0 \leq b_n \leq a_n$ and $\sum a_n$ converges, then $\sum b_n$ converges to a limit in $[0, \sum a_n]$.
- **Heine-Borel (Theorem 20):** A closed bounded set $S \subseteq \mathbb{R}^d$ is compact: every open cover has a finite subcover.

**Littlewood's philosophy:** A convergent series of non-negative terms can be thought of as a "main bit" (first $N$ terms) plus a "tiny error" (the remaining tail). This idea — splitting into a finite main part and a summable error — appears repeatedly in measure theory proofs.

## Key Results

### theorem: Linearity of expectation
**Number:** Theorem 7
**Plain English:** Expected value respects addition and scalar multiplication, regardless of dependence between variables.
**Formal:** If $X$ and $Y$ are random variables on a finite $\Omega$, and $\alpha, \beta \in \mathbb{R}$, then $\mathbb{E}(\alpha X + \beta Y) = \alpha \mathbb{E}(X) + \beta \mathbb{E}(Y)$.
**Proof sketch:** Write out the definition and rearrange (finite sum).
**Key technique:** Direct computation
**Load-bearing:** yes

### theorem: Antichain bound
**Number:** Theorem 8
**Plain English:** In any antichain on $\{1,\ldots,n\}$, the sum of inverse binomial coefficients is at most 1 — proved using a random permutation and linearity of expectation.
**Formal:** If $\mathcal{S} \subseteq \mathcal{P}(\{1,\ldots,n\})$ is an antichain, then $\sum_{S \in \mathcal{S}} \binom{n}{|S|}^{-1} \leq 1$.
**Proof sketch:**
1. Pick a uniform random permutation $\pi$
2. Define indicator $\mathbf{1}_S$ for each $S \in \mathcal{S}$
3. Show $X = \sum \mathbf{1}_S \leq 1$ (antichain property)
4. Apply linearity: $\mathbb{E}(X) = \sum \mathbb{P}(C_{|S|} = S) = \sum \binom{n}{|S|}^{-1} \leq 1$
**Key technique:** Indicator random variables + linearity
**Load-bearing:** no

### theorem: Absolute convergence and rearrangements
**Number:** Theorem 17
**Plain English:** For absolutely convergent series, the order of summation doesn't matter — and double sums of non-negative terms can be summed in any order.
**Formal:** If $\sum b_i$ is absolutely convergent and $\pi : \mathbb{N} \to \mathbb{N}$ is a bijection, then $\sum b_{\pi(i)} = \sum b_i$. If $\sum a_{i,j} = b_j$ are convergent series of non-negative terms and $L = \sum b_j$ converges, then the diagonal enumeration series also converges to $L$.
**Key technique:** Summable errors (Littlewood's philosophy)
**Load-bearing:** yes

### theorem: Comparison test for series
**Number:** Theorem 19
**Plain English:** A non-negative series bounded term-by-term by a convergent series must also converge.
**Formal:** If $\sum a_n$ converges with non-negative terms, and $0 \leq b_n \leq a_n$ for all $n$, then $\sum b_n$ converges to a limit in $[0, \sum a_n]$.
**Load-bearing:** yes

### theorem: Heine-Borel
**Number:** Theorem 20
**Plain English:** Every open cover of a closed bounded set in $\mathbb{R}^d$ has a finite subcover (compactness).
**Formal:** If $S$ is a closed and bounded set in $\mathbb{R}^d$ and $U_1, U_2, \ldots$ are open sets with $S \subseteq \bigcup U_j$, then there is a finite $J$ with $S \subseteq \bigcup_{j \in J} U_j$.
**Load-bearing:** no

## Exercises

### exercise: Comparison Test Proof
**Number:** Exercise 4
**Difficulty:** warm-up
**Tags:** series, comparison, convergence

**Question:**
Prove Theorem 19: Suppose $\sum_{n=1}^\infty a_n$ is a convergent series of non-negative real numbers, and suppose $0 \leq b_n \leq a_n$ for all $n \in \mathbb{N}$. Then $\sum_{n=1}^\infty b_n$ converges to a limit in $\big[0, \sum_{n=1}^\infty a_n\big]$.

**Hint 1:** Use monotonicity of partial sums
The partial sums $\sum_{i=1}^n b_i$ form a monotone increasing sequence (since $b_i \geq 0$). What do you need to show for this to converge?

**Hint 2:** Bound partial sums from above
$\sum_{i=1}^n b_i \leq \sum_{i=1}^n a_i \leq \sum_{i=1}^\infty a_i$. Use the fact that a bounded monotone sequence converges.

**Solution:**
For each $n \in \mathbb{N}$: $0 \leq \sum_{i=1}^n b_i \leq \sum_{i=1}^n a_i \leq \sum_{i=1}^\infty a_i$.

The partial sums $\sum_{i=1}^n b_i$ are monotone increasing (since $b_i \geq 0$) and bounded above by $\sum_{i=1}^\infty a_i$. By the monotone convergence property of $\mathbb{R}$, they converge to a limit, which must lie in $[0, \sum a_i]$.

### exercise: Heine-Borel Theorem
**Number:** Exercise 5
**Difficulty:** standard
**Tags:** compactness, Bolzano-Weierstrass, real-analysis

**Question:**
For any $d \in \mathbb{N}$, suppose $S$ is a closed and bounded set in $\mathbb{R}^d$, and let $U_1, U_2, \ldots$ be open sets whose union contains $S$. Prove that there is a finite $J$ such that $\bigcup_{j \in J} U_j$ contains $S$.

*Hint: if not, then for each $n$ there is $x_n \in S \setminus \bigcup_{i=1}^n U_i$. If it tends to a limit, what can you say? Recall the Bolzano-Weierstrass Theorem that any bounded sequence has a convergent subsequence.*

**Hint 1:** Construct a sequence of points not covered by finitely many $U_i$
Suppose no finite subcover exists. For each $n$, pick $x_n \in S \setminus (U_1 \cup \cdots \cup U_n)$.

**Hint 2:** Use Bolzano-Weierstrass and closedness
Since $S$ is bounded, $(x_n)$ has a convergent subsequence $(x_{i_n})$ with limit $y$. Since $S$ is closed, $y \in S$. So $y \in U_m$ for some $m$. Now derive a contradiction using the fact that $U_m$ is open.

**Solution:**
Suppose for contradiction no finite subcover exists. For each $n \in \mathbb{N}$, pick $x_n \in S \setminus \bigcup_{i=1}^n U_i$ (this is non-empty by assumption).

Since $S$ is bounded, by Bolzano-Weierstrass there is a convergent subsequence $(x_{i_n})$ with limit $y$. Since $S$ is closed, $y \in S$.

Since $y \in S \subseteq \bigcup_j U_j$, there exists $m$ with $y \in U_m$. Since $U_m$ is open, there exists $\varepsilon > 0$ such that the ball of radius $\varepsilon$ around $y$ is contained in $U_m$. Since $x_{i_n} \to y$, there exists $N$ with $\|x_{i_n} - y\| < \varepsilon$ for all $n > N$.

Choose $n$ with $i_n \geq m$ and $n > N$. Then $x_{i_n} \in U_m$ (it's within $\varepsilon$ of $y$), but by construction $x_{i_n} \notin U_1 \cup \cdots \cup U_{i_n} \supseteq U_m$. Contradiction.
