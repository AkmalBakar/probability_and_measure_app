---
level: 3
title: "σ-algebras & Measure Spaces"
notes: 1
prerequisites: [1, 2]
---

# Level 3: σ-algebras & Measure Spaces

## Reading

### Why finite axioms break down

When $\Omega$ is finite, the definitions from Levels 1--2 are all we need: the event space can be $\mathcal{P}(\Omega)$ and finite additivity gives us everything. But what happens when $\Omega$ is infinite?

**Example 21** exposes the problem. Consider tossing a fair coin until it comes up Heads. The sample space is

$$\Omega = \{H, TH, TTH, TTTH, \ldots\}.$$

We can figure out the probability of each singleton: $\mathbb{P}(\{TTTH\}) = \frac{1}{16}$, for instance. Using the axioms from the finite setting, the event space becomes $\mathcal{P}(\Omega)$ and we'd hope to compute the probability of any event. But this is false. The finite axioms only let us build up $\mathcal{F}$ from sets that are finite or have finite complement -- and there are events we care about that fall outside this. For instance, the event "the sequence has even length" (i.e. $\{TH, TTTH, TTTTTH, \ldots\}$) is an infinite set whose complement is also infinite. We cannot reach it with finitely many operations. We need a stronger closure property.

### σ-algebras: closing under countable operations

The fix is elegant: we demand that our collection of events be closed under *countable* unions.

**Definition 22 ($\sigma$-algebra).** Suppose $I$ is countable, and $A_i \in \mathcal{F}$ for each $i \in I$. Then $\bigcup_{i \in I} A_i$ is the countable union. We say $\mathcal{F}$ is **closed under countable unions**. If $\mathcal{F}$ is an algebra (closed under finite unions and complements) that is also closed under countable unions, we call $\mathcal{F}$ a **$\sigma$-algebra**.

The "$\sigma$" is not a variable -- it stands for "Summe" (German for "sum/series"), signalling that we can do countable operations.

**Countable additivity.** If in addition, whenever the $A_i$ are pairwise disjoint, we have $\mathbb{P}\!\bigl(\bigcup_i A_i\bigr) = \sum_i \mathbb{P}(A_i)$, we say $\mathbb{P}$ satisfies **countable additivity**. The sum on the right is now an infinite series -- a genuine limit of partial sums, not just a finite sum.

**Generated $\sigma$-algebra.** If $\mathcal{G}$ is any collection of subsets of $\Omega$, we write $\sigma(\mathcal{G})$ for the smallest $\sigma$-algebra on $\Omega$ that contains $\mathcal{G}$. This is well-defined because (Exercise 6 below):
1. The intersection of any family of $\sigma$-algebras is again a $\sigma$-algebra.
2. There is always at least one $\sigma$-algebra containing $\mathcal{G}$, namely $\mathcal{P}(\Omega)$.

So $\sigma(\mathcal{G}) = \bigcap \{\mathcal{F} : \mathcal{F} \text{ is a } \sigma\text{-algebra on } \Omega \text{ and } \mathcal{G} \subseteq \mathcal{F}\}$.

### The general probability space

**Definition 23 (Probability space: axioms).** A **probability space** $(\Omega, \mathcal{F}, \mathbb{P})$ consists of:
- a sample space $\Omega$,
- a $\sigma$-algebra $\mathcal{F}$ on $\Omega$ (the events),
- a function $\mathbb{P} : \mathcal{F} \to [0,1]$ that is **countably additive** and satisfies $\mathbb{P}(\Omega) = 1$.

Note the shift from the finite setting: we no longer insist that $\mathcal{F} = \mathcal{P}(\Omega)$, and finite additivity is upgraded to countable additivity. By Theorem 17 (rearrangement of absolutely convergent series), the order of a countable index set $I$ does not matter -- so the series $\sum_{i \in I} \mathbb{P}(A_i)$ is well-defined.

### Why not uncountable additivity?

At this point a natural question arises: why stop at countable unions? Why not close under *all* unions, countable or not? The set-theoretic side is fine ($\bigcup_{i \in I} X_i$ makes sense for any index set $I$), but the probability side breaks down. What would "uncountable additivity" $\sum_{i \in I} \mathbb{P}(X_i)$ even mean when $I$ is uncountable? We don't have a good way to define such a sum.

**Example 24** makes this concrete. Pick a number in $[0,1)$ uniformly at random. The sample space $\Omega = [0,1)$ is clear. For any $x \in [0,1)$, the probability $\mathbb{P}(\{x\})$ must be the same for all $x$ (by uniformity). It can't be positive: if $\mathbb{P}(\{x\}) = \varepsilon > 0$, then picking more than $\varepsilon^{-1}$ distinct points gives a set $A$ with $\mathbb{P}(A) > 1$, a contradiction. So $\mathbb{P}(\{x\}) = 0$ for all $x$.

Now for any $Y \subseteq [0,1]$, we can write $Y = \bigcup_{x \in Y} \{x\}$. If we tried "uncountable additivity":

$$\mathbb{P}(Y) = \sum_{x \in Y} \mathbb{P}(\{x\}) = \sum_{x \in Y} 0.$$

However we interpret this sum, it should be $0$ -- but then $\mathbb{P}([0,1)) = 0 \neq 1$. So uncountable additivity is incompatible with a uniform distribution on a continuous space. This is why we stick to countable additivity and countable unions.

### The Borel σ-algebra on $[0,1)$

Since we can't use $\mathcal{P}([0,1))$ and we can't use uncountable operations, we need a practical $\sigma$-algebra. The idea: start with a family of sets whose probabilities we *know*, and generate.

**Definition 25 (Borel $\sigma$-algebra on $[0,1)$).** The Borel $\sigma$-algebra on $[0,1)$ is

$$\mathcal{B}([0,1)) = \sigma\!\bigl(\{[a,b) : 0 \leq a < b \leq 1\}\bigr).$$

Intuitively, we start with all half-open intervals and close under complements, countable unions, and countable intersections. This gives us a rich collection of "measurable" sets -- rich enough for all practical purposes.

Note that singletons are in $\mathcal{B}([0,1))$: if $x \in [0,1)$ then $\{x\} = \bigcap_{n \in \mathbb{N}} [x, x + 1/n) \cap [0,1)$.

We define the probability space $([0,1], \mathcal{B}([0,1)), \mathbb{P})$ with $\mathbb{P}\bigl((a,b)\bigr) = b - a$ for all $0 \leq a < b \leq 1$. The existence of such a $\mathbb{P}$ (extending from intervals to the full $\sigma$-algebra while remaining countably additive) requires the **Caratheodory Extension Theorem**, which we'll meet later.

### Probabilities of intervals

**Theorem 26.** If $0 \leq a < b \leq 1$ then

$$\mathbb{P}([a,b]) = \mathbb{P}((a,b]) = \mathbb{P}((a,b)) = b - a.$$

*Proof idea.* Since $\mathbb{P}(\{a\}) = \mathbb{P}(\{b\}) = 0$, all four types of interval $[a,b]$, $[a,b)$, $(a,b]$, $(a,b)$ differ only by singleton sets of probability zero. By finite additivity (e.g. $[a,b] = [a,b) \cup \{b\}$, a disjoint union), they all have the same probability $b - a$.

This theorem justifies ignoring endpoints when computing probabilities on $[0,1)$.

### The Vitali construction: not all subsets are measurable

We've restricted to $\mathcal{B}([0,1))$ rather than $\mathcal{P}([0,1))$. Is this restriction really necessary? Could we extend $\mathbb{P}$ to *all* subsets? **Theorem 27** says no -- at least if we want shift-invariance.

**Shift-invariance** means: if $S \subseteq [0,1)$ is an event and $t > 0$ is such that $S_t = \{s + t : s \in S\} \cap [0,1)$ is defined, then $\mathbb{P}(S_t) = \mathbb{P}(S)$. For a "uniform" measure this is essential -- shifting a set shouldn't change its probability.

**Theorem 27 (Vitali's construction).** There is no shift-invariant probability function on $\mathcal{P}([0,1))$.

*Proof sketch.*

1. **Equivalence relation.** Define $x \sim y$ on $[0,1)$ iff $x - y \in \mathbb{Q}$. This partitions $[0,1)$ into uncountably many equivalence classes.

2. **Choice set.** Using the Axiom of Choice, pick one representative from each class to form a set $V$.

3. **Rational shifts.** For each $q \in \mathbb{Q}$, let $V_q = \{v + q : v \in V\} \cap [0,1)$. The sets $\{V_q\}_{q \in \mathbb{Q}}$ are countably many, disjoint, and their union is all of $[0,1)$.

4. **Contradiction.** By shift-invariance, all $V_q$ have the same probability $\varepsilon$. If $\varepsilon > 0$: there are infinitely many rationals, so we can pick enough $V_q$ to exceed total probability 1. If $\varepsilon = 0$: by countable additivity, $\mathbb{P}([0,1)) = \sum_{q \in \mathbb{Q}} \mathbb{P}(V_q) = 0 \neq 1$. Both cases give a contradiction.

This is the key "aha" moment of the level: **we cannot measure all subsets of $[0,1)$**. The Borel $\sigma$-algebra is not a limitation we impose out of laziness -- it is forced on us by the mathematics. The Vitali set $V$ is a subset of $[0,1)$ that is not in $\mathcal{B}([0,1))$ (indeed, not in any $\sigma$-algebra supporting a shift-invariant probability).

### General measure spaces

The framework of $(\Omega, \mathcal{F}, \mathbb{P})$ with $\mathbb{P}(\Omega) = 1$ is specific to probability. There's no reason to insist the total "size" is 1 -- the length of $\mathbb{R}$, for example, is $\infty$.

**Definition 28 (Measure space).** A **measure space** is a triple $(X, \mathcal{F}, \mu)$ where:
- $X$ is a set,
- $\mathcal{F}$ is a $\sigma$-algebra on $X$ (elements of $\mathcal{F}$ are called **measurable sets**),
- $\mu : \mathcal{F} \to \mathbb{R}_{\geq 0}^{\infty}$ is a **measure**: countably additive and $\mu(\emptyset) = 0$.

Here $\mathbb{R}_{\geq 0}^{\infty} = [0, \infty]$ is the extended non-negative reals. We allow $\mu(S) = \infty$. A probability space is just a measure space with $\mu(X) = 1$; "events" become "measurable sets" and "probability" becomes "measure".

The condition $\mu(\emptyset) = 0$ is not quite redundant: $\emptyset \cup \emptyset = \emptyset$ is a disjoint union, so additivity gives $\mu(\emptyset) = 2\mu(\emptyset)$, which means either $\mu(\emptyset) = 0$ or $\mu(\emptyset) = \infty$. We exclude the latter (it would force $\mu(S) = \infty$ for all $S$).

### The Borel σ-algebra in general

**Definition 29 (Borel $\sigma$-algebra).** If $(X, \mathcal{T})$ is any topological space (i.e. $\mathcal{T}$ is the collection of open sets in $X$), then the **Borel $\sigma$-algebra** is $\mathcal{B}(X, \mathcal{T}) = \sigma(\mathcal{T})$.

When the topology is "standard" (e.g. the usual topology on $\mathbb{R}$), we simply write $\mathcal{B}(\mathbb{R})$. Note that different topologies on the same set can generate different $\sigma$-algebras. In this course, we'll only ever work with (subsets of) $\mathbb{R}^d$ with its usual open sets, so the definition of "topological space" is not essential -- just think of $\sigma(\text{open sets})$.

The **Borel measure** on $\mathbb{R}^d$ is the measure $\mu$ on $\mathcal{B}(\mathbb{R}^d)$ satisfying $\mu((a,b)) = b - a$ (in 1D), or more generally assigning the standard "volume" to boxes. Its existence is guaranteed by the Caratheodory Extension Theorem.

## Key Results

### definition: σ-algebra
**Number:** Definition 22
**Plain English:** A collection of subsets closed under complements and countable unions -- the "right" notion of event space for infinite sample spaces.
**Formal:** A collection $\mathcal{F} \subseteq \mathcal{P}(\Omega)$ is a $\sigma$-algebra if it is an algebra (contains $\Omega$, closed under complements and finite unions) that is also closed under countable unions: if $I$ is countable and $A_i \in \mathcal{F}$ for all $i \in I$, then $\bigcup_{i \in I} A_i \in \mathcal{F}$. The $\sigma$-algebra generated by a collection $\mathcal{G}$ is $\sigma(\mathcal{G}) = \bigcap\{\mathcal{F} : \mathcal{F} \supseteq \mathcal{G},\; \mathcal{F} \text{ a } \sigma\text{-algebra}\}$.
**Load-bearing:** yes

### definition: Probability space (general)
**Number:** Definition 23
**Plain English:** A sample space, a σ-algebra of events, and a countably additive probability function summing to 1 -- the foundational triple for all of probability.
**Formal:** A probability space is a triple $(\Omega, \mathcal{F}, \mathbb{P})$ where $\mathcal{F}$ is a $\sigma$-algebra on $\Omega$, $\mathbb{P} : \mathcal{F} \to [0,1]$ is countably additive (for pairwise disjoint $(A_i)_{i \in I}$ with $I$ countable, $\mathbb{P}(\bigcup_i A_i) = \sum_i \mathbb{P}(A_i)$), and $\mathbb{P}(\Omega) = 1$.
**Load-bearing:** yes

### definition: Borel σ-algebra on [0,1)
**Number:** Definition 25
**Plain English:** The σ-algebra generated by all half-open intervals in $[0,1)$ -- the standard collection of "measurable" subsets of the unit interval.
**Formal:** $\mathcal{B}([0,1)) = \sigma(\{[a,b) : 0 \leq a < b \leq 1\})$.
**Load-bearing:** yes

### theorem: Probabilities of intervals
**Number:** Theorem 26
**Plain English:** Endpoints don't matter: all four types of interval between $a$ and $b$ have the same probability $b - a$.
**Formal:** If $0 \leq a < b \leq 1$ then $\mathbb{P}([a,b]) = \mathbb{P}((a,b]) = \mathbb{P}((a,b)) = b - a$.
**Proof sketch:** Since $\mathbb{P}(\{a\}) = \mathbb{P}(\{b\}) = 0$, each interval type is obtained from $(a,b)$ by adding or removing zero-probability singletons, so finite additivity gives the result.
**Key technique:** Decompose intervals as disjoint unions with singletons, apply finite additivity
**Load-bearing:** yes

### theorem: Vitali's construction
**Number:** Theorem 27
**Plain English:** There is no way to assign a shift-invariant probability to every subset of $[0,1)$ -- some sets are inherently non-measurable.
**Formal:** There is no shift-invariant probability function on $\mathcal{P}([0,1))$.
**Proof sketch:**
1. Define $x \sim y$ iff $x - y \in \mathbb{Q}$; pick one representative per class to form $V$ (Axiom of Choice)
2. Rational shifts $V_q$ are disjoint, countable, and cover $[0,1)$
3. Shift-invariance forces all $\mathbb{P}(V_q)$ equal; if positive then $\mathbb{P}([0,1)) > 1$; if zero then $\mathbb{P}([0,1)) = 0$
4. Both contradict $\mathbb{P}([0,1)) = 1$
**Key technique:** Equivalence relation + Axiom of Choice to build a paradoxical partition
**Load-bearing:** yes

### definition: Measure space
**Number:** Definition 28
**Plain English:** The generalisation of a probability space where the total "size" can be any non-negative value (including $\infty$), not just 1.
**Formal:** A measure space is $(X, \mathcal{F}, \mu)$ where $X$ is a set, $\mathcal{F}$ is a $\sigma$-algebra on $X$, and $\mu : \mathcal{F} \to \mathbb{R}_{\geq 0}^{\infty}$ is countably additive with $\mu(\emptyset) = 0$.
**Load-bearing:** yes

### definition: Borel σ-algebra (general)
**Number:** Definition 29
**Plain English:** For any topological space, the σ-algebra generated by its open sets -- the standard way to get measurable sets from topology.
**Formal:** If $(X, \mathcal{T})$ is a topological space, the Borel $\sigma$-algebra is $\mathcal{B}(X, \mathcal{T}) = \sigma(\mathcal{T})$.
**Load-bearing:** yes

## Exercises

### exercise: σ-algebras under union and intersection
**Number:** Exercise 6
**Difficulty:** standard
**Tags:** σ-algebra, intersection, generated σ-algebra, counterexample

**Question:**
(a) Give an example of two $\sigma$-algebras $\mathcal{F}$ and $\mathcal{F}'$ on $\{1,2,3,4\}$ whose union $\mathcal{F} \cup \mathcal{F}'$ is not a $\sigma$-algebra.

(b) Prove that for any sets $\Omega$ and $I$, if $\mathcal{F}_i$ is a $\sigma$-algebra on $\Omega$ for each $i \in I$, then $\bigcap_{i \in I} \mathcal{F}_i$ is a $\sigma$-algebra on $\Omega$.

(c) Deduce that $\sigma(\mathcal{G})$ is well-defined.

**Hint 1:** *What goes wrong with unions*
For part (a), try two simple $\sigma$-algebras on $\{1,2,3,4\}$ that each partition the set differently. Check whether the union is closed under intersection.

**Hint 2:** *Intersection preserves closure*
For part (b), take any countable family $(A_n)$ in $\bigcap_i \mathcal{F}_i$. Each $A_n$ is in every $\mathcal{F}_i$, and each $\mathcal{F}_i$ is a $\sigma$-algebra, so $\bigcup_n A_n \in \mathcal{F}_i$ for every $i$.

**Solution:**
(a) Take $\mathcal{F} = \{\emptyset, \{1,2\}, \{3,4\}, \{1,2,3,4\}\}$ and $\mathcal{F}' = \{\emptyset, \{1,3\}, \{2,4\}, \{1,2,3,4\}\}$. Both are $\sigma$-algebras. Their union contains $\{1,2\}$ and $\{1,3\}$, so if it were a $\sigma$-algebra it would contain $\{1,2\} \cap \{1,3\} = \{1\}$ (since $\sigma$-algebras are closed under intersection). But $\{1\} \notin \mathcal{F} \cup \mathcal{F}'$.

(b) We verify the $\sigma$-algebra axioms for $\bigcap_{i \in I} \mathcal{F}_i$:
- $\Omega \in \mathcal{F}_i$ for all $i$, so $\Omega \in \bigcap_i \mathcal{F}_i$.
- If $F \in \bigcap_i \mathcal{F}_i$, then $F \in \mathcal{F}_i$ for all $i$, so $F^c \in \mathcal{F}_i$ for all $i$, hence $F^c \in \bigcap_i \mathcal{F}_i$.
- If $(F_n)$ is a countable sequence in $\bigcap_i \mathcal{F}_i$, then each $F_n \in \mathcal{F}_i$ for all $i$, so $\bigcup_n F_n \in \mathcal{F}_i$ for all $i$, hence $\bigcup_n F_n \in \bigcap_i \mathcal{F}_i$.

(c) Let $\{\mathcal{F}_i : i \in I\}$ be the set of all $\sigma$-algebras on $\Omega$ containing $\mathcal{G}$. This set is non-empty because $\mathcal{P}(\Omega)$ is in it. By (b), $\bigcap_{i \in I} \mathcal{F}_i$ is a $\sigma$-algebra. It contains $\mathcal{G}$ (since each $\mathcal{F}_i$ does). It is contained in every $\sigma$-algebra containing $\mathcal{G}$ (by set inclusion), making it the smallest. Hence $\sigma(\mathcal{G}) = \bigcap_{i \in I} \mathcal{F}_i$ is well-defined.

### exercise: Open sets as countable unions
**Number:** Exercise 7
**Difficulty:** standard
**Tags:** Borel σ-algebra, open sets, countable additivity, series

**Question:**
Prove that we can write any open set in $[0,1)$ as the disjoint union of a countable collection of open intervals and singleton sets. Conclude that $\mathbb{P}(S)$ is the sum of a series with non-negative terms.

**Hint 1:** *Approximation by dyadic intervals*
For each $n \geq 1$, divide $[0,1)$ into $2^n$ equal half-open intervals. Collect all the "pieces" (intervals or singletons at left endpoints) that are subsets of $S$.

**Hint 2:** *Use the procedure from the notes*
Let $\mathcal{A}_n$ consist of the pieces from level $n$ that are subsets of $S_{n-1}$ (the remainder after removing previous pieces). The union $\mathcal{A} = \bigcup_n \mathcal{A}_n$ is countable and disjoint by construction. Show $\bigcup \mathcal{A} = S$ by arguing that any $y \in S$ not of the form $m 2^{-n}$ is eventually captured.

**Solution:**
Run the procedure from the notes. For each $n \geq 1$, divide $[0,1)$ into $2^n$ half-open intervals of length $2^{-n}$, plus singletons at their left endpoints (giving $2^{n+1}$ pieces total). Let $\mathcal{A}_n$ be those pieces contained in $S$ but not in any previously selected piece, and let $S_n = S_{n-1} \setminus \bigcup \mathcal{A}_n$.

Each $\mathcal{A}_n$ has at most $2^{n+1}$ elements, so $\mathcal{A} = \bigcup_{n \geq 1} \mathcal{A}_n$ is a countable union of finite sets, hence countable. The pieces are disjoint by construction.

To show $\bigcup \mathcal{A} = S$: clearly $\bigcup \mathcal{A} \subseteq S$. For the reverse, suppose $y \in S \setminus \bigcup \mathcal{A}$. If $y = m 2^{-n}$ for some $m, n$, then the singleton $\{y\}$ is one of the pieces at level $n$, and since $y \in S$ (which is open, so $\{y\} \subseteq S$... but singletons aren't open). More carefully: since $S$ is open, there is $\varepsilon > 0$ with $(y - \varepsilon, y + \varepsilon) \cap [0,1) \subseteq S$. Choose $n$ with $2^{-n} < \varepsilon$; then the interval $(m 2^{-n}, (m+1)2^{-n})$ containing $y$ (or a neighbouring piece) is contained in $S$, so $y \in \bigcup \mathcal{A}$.

Since $S = \bigsqcup_{A \in \mathcal{A}} A$ is a disjoint countable union of events, countable additivity gives $\mathbb{P}(S) = \sum_{A \in \mathcal{A}} \mathbb{P}(A)$, a series with non-negative terms.

### exercise: Probability of the irrationals
**Number:** Exercise 8
**Difficulty:** warm-up
**Tags:** countable additivity, rationals, Borel measure

**Question:**
Calculate $\mathbb{P}([0,1) \setminus \mathbb{Q})$.

**Hint 1:** *Decompose $[0,1)$*
Write $[0,1) = ([0,1) \cap \mathbb{Q}) \cup ([0,1) \setminus \mathbb{Q})$, a disjoint union.

**Hint 2:** *Use countable additivity on the rationals*
$[0,1) \cap \mathbb{Q}$ is a countable set. Write it as $\bigcup_{q \in [0,1) \cap \mathbb{Q}} \{q\}$, a countable disjoint union of singletons each with probability 0.

**Solution:**
Each singleton has probability zero: $\mathbb{P}(\{x\}) = 0$ for all $x \in [0,1)$. The set $[0,1) \cap \mathbb{Q}$ is countable (since $\mathbb{Q}$ is countable), so by countable additivity:

$$\mathbb{P}([0,1) \cap \mathbb{Q}) = \sum_{q \in [0,1) \cap \mathbb{Q}} \mathbb{P}(\{q\}) = 0.$$

Since $[0,1) = ([0,1) \cap \mathbb{Q}) \sqcup ([0,1) \setminus \mathbb{Q})$:

$$\mathbb{P}([0,1) \setminus \mathbb{Q}) = \mathbb{P}([0,1)) - \mathbb{P}([0,1) \cap \mathbb{Q}) = 1 - 0 = 1.$$

The irrationals in $[0,1)$ have full probability.

### exercise: The Cantor set
**Number:** Exercise 9
**Difficulty:** challenge
**Tags:** Cantor set, Borel measure, uncountability, nested intervals

**Question:**
(a) Show that $\mathbb{Q} \subseteq \mathbb{R}$ is measurable and has Borel measure zero.

Let $C_1 = [0,1]$. For each $n \geq 2$, let $C_n$ be obtained from $C_{n-1}$ by removing the middle third of each closed interval: if $(x,y)$ is a maximal open interval in $C_{n-1}$'s complement (i.e. $[x,y]$ is one of the disjoint closed intervals making up $C_{n-1}$), we remove $\bigl(\frac{2}{3}x + \frac{1}{3}y,\; \frac{1}{3}x + \frac{2}{3}y\bigr)$.

(b) Explain why $C_n$ is a union of disjoint closed intervals and has Borel measure $(2/3)^{n-1}$.

Let $C = \bigcap_{n=1}^{\infty} C_n$.

(c) Prove that $C$ has Borel measure zero.

(d) Prove that $C$ is uncountable. *Hint: each interval in $C_n$ is split into a "left" and a "right" interval in $C_{n+1}$; use this to construct a bijection with $\mathcal{P}(\mathbb{N})$. You will need the analysis fact that any nested sequence $A_1 \supseteq A_2 \supseteq A_3 \supseteq \cdots$ of closed and bounded intervals in $\mathbb{R}$ has non-empty intersection.*

**Hint 1:** *Strategy for each part*
(a) Write $\{q\} = (q-1, q) \cup \{q\} \cup (q, q+1) \setminus$ the open intervals, showing singletons are Borel; then $\mathbb{Q}$ is a countable union.
(b) At each step we replace one interval with two intervals of $\frac{1}{3}$ the length each, so total measure scales by $\frac{2}{3}$.
(c) $C \subseteq C_n$ for all $n$, and $\mu(C_n) \to 0$.
(d) Binary choices (left/right) at each level encode subsets of $\mathbb{N}$.

**Hint 2:** *Key calculations*
(a) For $q \in \mathbb{Q}$: $(q-1, q+1) = (q-1,q) \cup \{q\} \cup (q, q+1)$ so $\mu(\{q\}) = 2 - 1 - 1 = 0$. Then $\mu(\mathbb{Q}) = \sum_{q \in \mathbb{Q}} 0 = 0$.
(b) $C_1$ has measure 1. At step $n$, each of the $2^{n-2}$ intervals of length $3^{-(n-2)}$ is replaced by two of length $3^{-(n-1)}$, so $\mu(C_n) = 2^{n-1} \cdot 3^{-(n-1)} = (2/3)^{n-1}$.
(c) $0 \leq \mu(C) \leq \mu(C_n) = (2/3)^{n-1} \to 0$.
(d) For each $S \subseteq \mathbb{N}$, choose "left" at level $n$ if $n \in S$, "right" otherwise, obtaining a nested sequence of closed intervals whose intersection is a single point $x_S \in C$. Different $S$ give different $x_S$.

**Solution:**
**(a)** For any $q \in \mathbb{Q}$, write $(q-1, q+1) = (q-1, q) \cup \{q\} \cup (q, q+1)$, so $\{q\} = (q-1, q+1) \setminus \bigl((q-1,q) \cup (q,q+1)\bigr)$. Since open intervals are in $\mathcal{B}(\mathbb{R})$, so are their complements and unions, hence $\{q\} \in \mathcal{B}(\mathbb{R})$. By countable additivity: $\mu(\{q\}) = \mu((q-1,q+1)) - \mu((q-1,q)) - \mu((q,q+1)) = 2 - 1 - 1 = 0$. Since $\mathbb{Q} = \bigcup_{q \in \mathbb{Q}} \{q\}$ is a countable disjoint union, $\mu(\mathbb{Q}) = \sum_{q \in \mathbb{Q}} 0 = 0$.

**(b)** By induction. $C_1 = [0,1]$ is a single closed interval with measure 1. At each step, every interval $[x,y]$ in $C_{n-1}$ is replaced by $[x, \frac{2}{3}x + \frac{1}{3}y]$ and $[\frac{1}{3}x + \frac{2}{3}y, y]$, which are disjoint closed intervals. The original interval has length $y - x$; the two replacements each have length $\frac{1}{3}(y-x)$. So the number of intervals doubles while each length is divided by 3. Total: $2^{n-1}$ intervals, each of length $3^{-(n-1)}$, giving $\mu(C_n) = 2^{n-1} \cdot 3^{-(n-1)} = (2/3)^{n-1}$.

**(c)** Since $C = \bigcap_{n=1}^\infty C_n$, we have $C \subseteq C_n$ for every $n$, so $\mu(C) \leq \mu(C_n) = (2/3)^{n-1}$. Taking $n \to \infty$: $\mu(C) \leq \lim_{n \to \infty} (2/3)^{n-1} = 0$. Since $\mu(C) \geq 0$, we get $\mu(C) = 0$.

**(d)** Think of $C_n$'s intervals as a binary tree: $C_1$ has one interval (the root $[0,1]$). Each interval in $C_n$ splits into a "left" child and a "right" child in $C_{n+1}$. Every child interval is a closed interval contained in its parent.

For any $S \subseteq \mathbb{N}$, define a path through this tree: let $A_1 = [0,1]$. For $n \geq 2$, let $A_n$ be the left child of $A_{n-1}$ if $1 \in S$... more precisely, at level $n$, choose the left child of $A_{n-1}$ if $n-1 \in S$, and the right child otherwise. This gives a nested sequence $A_1 \supseteq A_2 \supseteq \cdots$ of closed bounded intervals. By the nested intervals theorem (a consequence of Heine-Borel / completeness of $\mathbb{R}$), $\bigcap_{n=1}^\infty A_n \neq \emptyset$; pick $x_S$ from this intersection. Since $x_S \in A_n \subseteq C_n$ for all $n$, we have $x_S \in C$.

If $S \neq S'$, let $n$ be the smallest index where they differ. Then (w.l.o.g.) $x_S$ is in the left child and $x_{S'}$ is in the right child of $A_n$. These are disjoint intervals, so $x_S \neq x_{S'}$.

This gives an injection $\mathcal{P}(\mathbb{N}) \hookrightarrow C$. Since $\mathcal{P}(\mathbb{N})$ is uncountable (Theorem 14), $C$ is uncountable.

Thus $C$ is an uncountable set with Borel measure zero -- it is "large" in cardinality but "small" in measure.
