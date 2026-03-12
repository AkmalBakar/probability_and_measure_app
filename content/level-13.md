---
level: 13
title: "Conditional Expectation on Events"
status: wip
notes: 4
prerequisites: [9]
---

# Level 13: Conditional Expectation on Events

## Reading

We have built up the Lebesgue integral and the formal definition of expectation. Now we turn to a fundamental question: **given partial information, what is our best guess for a random variable?** This is the idea behind conditional expectation, and it is the foundation for everything that follows — martingales, financial mathematics, and stochastic processes.

### From discrete to general: revisiting conditional expectation

Recall the informal definition from discrete probability: if $A$ is an event with $\mathbb{P}(A) > 0$, the conditional expectation of $X$ given $A$ is

$$\mathbb{E}(X | A) = \frac{\mathbb{E}(X \mathbf{1}_A)}{\mathbb{P}(A)}.$$

This is just a number — the average value of $X$ over the outcomes in $A$, weighted by their probability.

**Definition 1 (Conditional expectation on an event).** Let $(\Omega, \mathcal{F}, \mathbb{P})$ be a probability space, and $X : \Omega \to \mathbb{R}$ a random variable such that $\int_\Omega |X| \, \mathrm{d}\mathbb{P} < \infty$. If $A \in \mathcal{F}$ has $\mathbb{P}(A) > 0$, we define the conditional expectation

$$\mathbb{E}(X | A) = \mathbb{P}(A)^{-1} \int_A X \, \mathrm{d}\mathbb{P},$$

if it exists.

This is only really different from the discrete version in that we now formally use the Lebesgue integral. Recall that the Lebesgue integral generalises the sum definition we gave before in the special case that $\Omega$ is a finite set.

Important: expectation and conditional expectation don't behave well if we drop the condition $\int_\Omega |X| \, \mathrm{d}\mathbb{P} < \infty$ (sometimes written "$X$ is in $L^1$"), so we will routinely insist on this.

### Example 2: Two fair coins

Consider tossing two fair coins in sequence. Let $X$ count the number of Heads obtained in total, and let $Y$ be the indicator of the event that the first coin lands Heads.

We can compute the conditional expectations:

$$\mathbb{E}(X | Y = 0) = 2\!\left(0 \cdot \tfrac{1}{4} + 1 \cdot \tfrac{1}{4}\right) = \tfrac{1}{2}$$

$$\mathbb{E}(X | Y = 1) = 2\!\left(1 \cdot \tfrac{1}{4} + 2 \cdot \tfrac{1}{4}\right) = \tfrac{3}{2}.$$

But it would be "nicer" to write $\mathbb{E}(X | Y) = Y + \tfrac{1}{2}$, by which we intend to capture both conditional expectations in one formula. If we know the value of $Y$, then the conditional expectation of $X$ is $Y + \tfrac{1}{2}$.

### Key insight: conditional expectation is a random variable

We should immediately notice: $\mathbb{E}(X | Y)$ is **not a number**. It is a random variable — a function from $\Omega$ to $\mathbb{R}$.

This immediately means we should put in a sanity condition: if $\mathbb{E}(X | Y)$ is supposed to be our best guess at the value of $X$ given the information $Y$, then we should certainly give the *same* guess for $\omega, \omega' \in \Omega$ if $Y(\omega) = Y(\omega')$. In other words, $\mathbb{E}(X | Y)$ should be $\sigma(Y)$-measurable. In the coin example, that happened "automatically": we decided the right function to write is $Y + \tfrac{1}{2}$, and that function is $\sigma(Y)$-measurable.

### Example 3: Continuous uniform samples

Consider making two independent uniform samples from $[0, 1)$ in sequence. Let $X$ be the sum of the two samples, and let $Y$ be the first sample.

Intuitively, for any given $y \in [0, 1)$, if the first sample is $Y = y$, our best guess for the sum of the two samples is $y + \tfrac{1}{2}$; it seems reasonable to call that the conditional expectation.

So we would like to write (again) $\mathbb{E}(X | Y) = Y + \tfrac{1}{2}$. As before, this function is $\sigma(Y)$-measurable.

Unfortunately, this time we cannot make sense of this conditional expectation in terms of the event $Y = y$: that event has probability 0. However, we don't really ever want to know what happens for the event $Y = y$, because that event has probability 0 — it doesn't actually happen! What we do need is something we can integrate over events of positive probability and expect to get the right answer, because those are events that actually happen.

### The road to the formal definition

The key observations from these examples are:

1. **Conditional expectation is a random variable**, not a number.
2. It must be **measurable with respect to the conditioning information** ($\sigma(Y)$-measurable).
3. It must give the right answer **when we integrate** over events in $\sigma(Y)$.

These three properties motivate the formal definition in the next level. For now, let us practice with the event-based definition and build intuition.

### Total expectation

A useful consequence of conditioning on events is the **law of total expectation**. If $A_1, A_2, \ldots$ is a partition of $\Omega$ into events of positive probability, then

$$\mathbb{E}(X) = \sum_i \mathbb{E}(X | A_i) \, \mathbb{P}(A_i).$$

This is immediate from the definition: $\sum_i \mathbb{E}(X | A_i) \mathbb{P}(A_i) = \sum_i \int_{A_i} X \, \mathrm{d}\mathbb{P} = \int_\Omega X \, \mathrm{d}\mathbb{P} = \mathbb{E}(X)$.

The law of total expectation is extremely useful in practice — it lets us break a complicated expectation into simpler pieces by conditioning on different cases.

## Key Results

### definition: Conditional expectation on an event
**Number:** Definition 1
**Plain English:** The average value of $X$ restricted to the event $A$, normalized by the probability of $A$. This is a number, not a random variable.
**Formal:** Let $(\Omega, \mathcal{F}, \mathbb{P})$ be a probability space, $X$ a random variable with $\mathbb{E}(|X|) < \infty$. If $A \in \mathcal{F}$ with $\mathbb{P}(A) > 0$, then $\mathbb{E}(X | A) = \mathbb{P}(A)^{-1} \int_A X \, \mathrm{d}\mathbb{P}$.
**Load-bearing:** yes

### theorem: Law of total expectation
**Number:** (unnumbered, follows from Definition 1)
**Plain English:** If you partition the sample space into events and compute the conditional expectation on each piece, the probability-weighted sum recovers the unconditional expectation.
**Formal:** If $A_1, A_2, \ldots$ partition $\Omega$ with $\mathbb{P}(A_i) > 0$ for all $i$, then $\mathbb{E}(X) = \sum_i \mathbb{E}(X | A_i) \, \mathbb{P}(A_i)$.
**Proof sketch:** Expand definition: $\sum_i \frac{1}{\mathbb{P}(A_i)} \int_{A_i} X \, \mathrm{d}\mathbb{P} \cdot \mathbb{P}(A_i) = \sum_i \int_{A_i} X \, \mathrm{d}\mathbb{P} = \int_\Omega X \, \mathrm{d}\mathbb{P}$.
**Key technique:** Partition + linearity of integral
**Depends on:** Definition 1
**Used by:** Level 14 (motivating the formal definition)
**Load-bearing:** yes

## Exercises

### exercise: Uniqueness of CE for finite $\sigma$-algebras
**Number:** Exercise 1
**Difficulty:** standard
**Tags:** conditional-expectation, sigma-algebra, uniqueness, finite-partition

**Question:**
Let $(\Omega, \mathcal{F}, \mathbb{P})$ be a probability space, and $X$ a random variable with $\mathbb{E}(|X|) < \infty$. Suppose $\mathcal{G}$ is a $\sigma$-algebra on $\Omega$ with finitely many sets, and suppose $\mathbb{P}(G) > 0$ for all $G \in \mathcal{G}$ with $G \neq \emptyset$.

Prove that there is exactly one function $Y$ such that $Y = \mathbb{E}(X | \mathcal{G})$.

*(Hint: consider the minimal non-empty sets in $\mathcal{G}$: how should $Y$ be defined on these?)*

**Hint 1:** Identify the atoms of $\mathcal{G}$
Given $\omega \in \Omega$, consider the collection of all sets in $\mathcal{G}$ which contain $\omega$. This is a finite collection, so the intersection is a set $F_\omega$ in $\mathcal{G}$. The set is non-empty since it contains $\omega$. By assumption $\mathbb{P}(F_\omega) > 0$, and so $\mathbb{E}(X | F_\omega)$ is defined. Set $Y(\omega) = \mathbb{E}(X | F_\omega)$.

**Hint 2:** Verify the three conditions
Write $Y = \sum_A \mathbf{1}_A \mathbb{E}(X | A)$ where the sum runs over all minimal non-empty sets in $\mathcal{G}$. Check: (i) $\mathbb{E}(|Y|) \leq \mathbb{E}(|X|) < \infty$. (ii) $Y$ is $\mathcal{G}$-measurable since each $\mathbf{1}_A$ is. (iii) For any $B \in \mathcal{G}$, $B$ is a disjoint union of minimal sets, so $\mathbb{E}(Y \mathbf{1}_B) = \sum_{A \subseteq B} \mathbb{E}(X | A) \mathbb{P}(A) = \sum_{A \subseteq B} \mathbb{E}(X \mathbf{1}_A) = \mathbb{E}(X \mathbf{1}_B)$.

**Solution:**
We first define a function that works: given $\omega \in \Omega$, consider the collection of all sets in $\mathcal{G}$ which contain $\omega$. This is a finite collection, so the intersection is a set $F_\omega$ in $\mathcal{G}$, and the set is non-empty since it contains $\omega$. By assumption, $\mathbb{P}(F_\omega) > 0$, and so $\mathbb{E}(X | F_\omega)$ is defined. Let $Y(\omega) = \mathbb{E}(X | F_\omega)$. Equivalently, $Y = \sum_A \mathbf{1}_A \mathbb{E}(X | A)$ where the sum runs over all minimal non-empty sets $A$ in $\mathcal{G}$.

We claim this function is a version of $\mathbb{E}(X | \mathcal{G})$.

**Condition (i):** If for some minimal non-empty $A$ we have $\mathbb{E}(X | A)$ equal to $\infty$ or $-\infty$, then $\mathbb{E}(|X| \mathbf{1}_A) = \infty$. It follows that $\mathbb{E}(|Y|) = \sum_A |\mathbb{E}(X | A)| \mathbb{P}(A) \leq \sum_A \mathbb{E}(|X| \mathbf{1}_A) = \mathbb{E}(|X|) < \infty$ by Jensen/triangle inequality. So $\mathbb{E}(|Y|) < \infty$.

**Condition (ii):** The $\mathcal{G}$-measurability is true by construction: we wrote $Y$ as a simple function with $\mathcal{G}$-measurable indicators.

**Condition (iii):** Given $B \in \mathcal{G}$, because $B_i \in \sigma(Y)$ and by disjointness and minimality of $C$, we have either $B_i = C$ or $B_i \cap C = \emptyset$; again by disjointness there is at most one value of $i$ such that the former holds. So:

$$\mathbb{E}(Y \mathbf{1}_B) = \mathbb{E}\!\left(\mathbf{1}_B \sum_A \mathbf{1}_A \mathbb{E}(X|A)\right) = \sum_{A \subseteq B} \mathbb{E}(X|A) \, \mathbb{P}(A) = \sum_{A \subseteq B} \mathbb{E}(X \mathbf{1}_A) = \mathbb{E}(X \mathbf{1}_B)$$

as required.

**Uniqueness:** Now suppose $Y'$ is also a version of $\mathbb{E}(X | \mathcal{G})$. The set $\{\omega : Y(\omega) > Y'(\omega)\}$ is a measurable set (because $Y - Y'$ is measurable), so let it be $B \in \mathcal{G}$. If $B$ is non-empty, take a minimal non-empty subset $A$ of $B$. By definition $Y - Y'$ is constant on $A$ with strictly positive value $c$. But then $\mathbb{E}(Y \mathbf{1}_A) = \mathbb{E}(Y' \mathbf{1}_A) + c\mathbb{P}(A) > \mathbb{E}(Y' \mathbf{1}_A)$, which contradicts the fact that both sides must equal $\mathbb{E}(X \mathbf{1}_A)$ by condition (iii). Thus $B = \emptyset$, and by symmetry the set $\{Y < Y'\}$ is also empty, so $Y = Y'$ everywhere.

### exercise: Two versions agree almost surely
**Number:** Exercise 2
**Difficulty:** standard
**Tags:** conditional-expectation, uniqueness, almost-surely, measurability

**Question:**
Suppose $Y$ and $Y'$ are two versions of the conditional expectation $\mathbb{E}(X | \mathcal{G})$. Prove that $Y = Y'$ almost surely.

**Hint 1:** Consider $Z = \max(Y - Y', 0)$
Define $Z = \max(Y - Y', 0)$. For $n \in \mathbb{N}$, consider the set $A_n = \{\omega : Z(\omega) \geq \frac{1}{n}\}$. By definition we have $A_n \in \mathcal{G}$, and hence applying condition (iii) twice gives useful information.

**Hint 2:** Use condition (iii) to show $\mathbb{P}(A_n) = 0$
We have $\mathbb{E}(Y \mathbf{1}_{A_n}) = \mathbb{E}(X \mathbf{1}_{A_n})$ and $\mathbb{E}(Y' \mathbf{1}_{A_n}) = \mathbb{E}(X \mathbf{1}_{A_n})$. So $\mathbb{E}((Y - Y') \mathbf{1}_{A_n}) = 0$. But on $A_n$, $Y - Y' \geq \frac{1}{n} > 0$. So $\frac{1}{n}\mathbb{P}(A_n) \leq 0$, giving $\mathbb{P}(A_n) = 0$. Take the countable union.

**Solution:**
Consider the $\mathcal{G}$-measurable function $Z = \max(Y - Y', 0)$. For $n \in \mathbb{N}$ the set $A_n = \{\omega : Z(\omega) \geq \frac{1}{n}\}$. By definition we have $A_n \in \mathcal{G}$, and hence applying condition (iii):

$$\mathbb{E}(X \mathbf{1}_{A_n}) = \mathbb{E}(Y \mathbf{1}_{A_n}) \geq \mathbb{E}(Y' \mathbf{1}_{A_n} + \tfrac{1}{n} \mathbf{1}_{A_n}) = \mathbb{E}(Y' \mathbf{1}_{A_n}) + \tfrac{1}{n}\mathbb{P}(A_n) = \mathbb{E}(X \mathbf{1}_{A_n}) + \tfrac{1}{n}\mathbb{P}(A_n).$$

It follows $\mathbb{P}(A_n) = 0$, and taking the countable union, $\mathbb{P}\!\left(\bigcup_{n \in \mathbb{N}} A_n\right) = 0$. Now this is the set of $\omega$ such that $Y(\omega) > Y'(\omega)$; by symmetry the set of $\omega$ such that $Y(\omega) < Y'(\omega)$ also has measure zero, proving $Y = Y'$ almost surely.
