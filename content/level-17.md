---
level: 17
title: "Martingales — Definition & Examples"
notes: 4
prerequisites: [15]
---

# Level 17: Martingales — Definition & Examples

## Reading

We now introduce one of the most powerful and elegant concepts in probability theory: **martingales**. The idea is simple but far-reaching. We think about a discrete-time process: we start at time 0, and at each time $n \in \mathbb{N}$ a piece of randomness occurs. We want to understand how the process evolves.

### Filtrations and adapted processes

**Definition 9 (Filtration, process adapted to a filtration).** A **filtration** on $(\Omega, \mathcal{F}, \mathbb{P})$ is a sequence $\mathcal{F}_0 \subseteq \mathcal{F}_1 \subseteq \ldots$ of $\sigma$-algebras contained in $\mathcal{F}$; we often write $(\mathcal{F}_n)$. We sometimes say **filtered probability space** for a probability space together with a filtration on it.

The process $(X_n)$ is **adapted** to the filtration $(\mathcal{F}_n)$ if for all $n \in \mathbb{N}$, the random variable $X_n$ is $\mathcal{F}_n$-measurable.

The **natural filtration** of a process $(X_n)$ is defined by $\mathcal{F}_0 = \{\emptyset, \Omega\}$ and $\mathcal{F}_n = \sigma(X_1, \ldots, X_n)$ for $n \in \mathbb{N}$.

Think of $\mathcal{F}_{n-1}$ as carrying all the information about the random choices up to and including time $n-1$, but not about time $n$. So $Y_n$ will be $\mathcal{F}_n$-measurable (we know its value at time $n$), but not $\mathcal{F}_{n-1}$-measurable (we don't know it at time $n-1$). However, $\mathbb{E}(Y_n | \mathcal{F}_{n-1}) = 0$ does **not** tell us that $Y_n$ is independent of $Y_1, \ldots, Y_{n-1}$.

### The martingale definition

**Definition 10 (Martingale, supermartingale, submartingale).** Given a filtered probability space $(\Omega, \mathcal{F}, \mathbb{P})$ with $(\mathcal{F}_n)$, let $(X_0, X_1, \ldots)$ be a process adapted to the filtration. We say $(X_n)$ is a **martingale** if

- $\mathbb{E}(|X_n|) < \infty$ for each $n \geq 0$, and
- $\mathbb{E}(X_n | \mathcal{F}_{n-1}) = X_{n-1}$ for each $n \in \mathbb{N}$.

The process is a **supermartingale** if $=$ is replaced by $\leq$, and a **submartingale** if $=$ is replaced by $\geq$.

If you are in a casino, the game you play at time $n$ may depend on the amount $X_{n-1}$, or more generally the history $\mathcal{F}_{n-1}$ of your evening to date. But the casino will ensure that in expectation you lose: $\mathbb{E}(X_n | \mathcal{F}_{n-1}) \leq X_{n-1}$. This is a supermartingale: it's super for the casino!

At this stage, the definition means: a martingale is a process which doesn't have any bias; your best guess for the next value is simply the current value — it shouldn't necessarily be obvious why this is an interesting kind of process to consider. The short version is: a martingale is the "random part" of your process, and the "drift part" can be handled separately.

### Example: Sums of zero-mean increments

**Exercise 7.** If $Y_1, Y_2, \ldots$ is a sequence of random variables such that for each $n \in \mathbb{N}$ we have $\mathbb{E}(|Y_n|) < \infty$, $\mathbb{E}(Y_n | \mathcal{F}_{n-1}) = 0$, and $Y_n$ is $\mathcal{F}_n$-measurable, then $X_n = \sum_{k=1}^n Y_k$ defines a process adapted to $(\mathcal{F}_n)$, and this process is a martingale.

The proof is straightforward: $\mathbb{E}(X_n | \mathcal{F}_{n-1}) = \mathbb{E}(X_{n-1} + Y_n | \mathcal{F}_{n-1}) = X_{n-1} + \mathbb{E}(Y_n | \mathcal{F}_{n-1}) = X_{n-1}$, using CE2 (linearity) and CE1 (known pass through).

### The Doob martingale

Another natural construction: let $(\Omega, \mathcal{F}, \mathbb{P})$ be a filtered probability space with $(\mathcal{F}_n)$, and $X$ be a random variable with $\mathbb{E}(|X|) < \infty$. The **Doob martingale** is defined by $X_n = \mathbb{E}(X | \mathcal{F}_n)$ for each $n$.

**Exercise 8.** The Doob construction gives a martingale.

*Proof.* Adaptedness: $X_n = \mathbb{E}(X | \mathcal{F}_n)$ is $\mathcal{F}_n$-measurable by definition of conditional expectation (property (ii)).

$L^1$ property: $\mathbb{E}(|X_n|) = \mathbb{E}(|\mathbb{E}(X | \mathcal{F}_n)|) \leq \mathbb{E}(\mathbb{E}(|X| \mid \mathcal{F}_n)) = \mathbb{E}(|X|) < \infty$ by the conditional Jensen inequality (CE8, since $|\cdot|$ is convex) and the tower property (CE9).

Martingale property: $\mathbb{E}(X_n | \mathcal{F}_{n-1}) = \mathbb{E}(\mathbb{E}(X | \mathcal{F}_n) | \mathcal{F}_{n-1}) = \mathbb{E}(X | \mathcal{F}_{n-1}) = X_{n-1}$ by the tower property (CE9). $\square$

The Doob martingale is "trivially" a martingale. What it's doing is saying we can think of building up to the "complete" random variable $X$ by steadily taking account of more and more information, revealing a bit of randomness every time.

### Example 11: 3-term arithmetic progressions

Let $S$ be a subset of $\{1, 2, \ldots, N\}$ obtained by selecting, independently with probability $p$ for each $1 \leq n \leq N$, the integer $n$ into $S$. Let $X$ count the number of 3-term arithmetic progressions in $S$, and let $X_n = \mathbb{E}(X | \mathcal{F}_n)$ as in the Doob construction. Then $X_0 = \mathbb{E}(X)$ and $X_N = X$.

### Example 12: Skewed random walk (extracting a martingale)

Consider a skewed random walk defined by $Y_n$ taking values 1.1 with probability $\frac{1}{2}$ and $-0.9$ with probability $\frac{1}{2}$, independently. Let $X_n = \sum_{i=1}^n Y_i$. The process $(X_n)$ is not a martingale (it has drift $\frac{1}{10}n$), but $(X_n - \frac{1}{10}n)$ is a martingale.

The point: we can always turn a sum of random variables into a martingale by subtracting the drift. Formally, we subtract $\mathbb{E}(Y_n | \mathcal{F}_{n-1})$ from $Y_n$.

### Example 13: General martingale decomposition

Let $Y_1, Y_2, \ldots$ be any sequence of random variables with $\mathbb{E}(|Y_n|) < \infty$ adapted to a filtration $(\mathcal{F}_n)$. Then

$$X_n = \sum_{i=1}^n \bigl(Y_i - \mathbb{E}(Y_i | \mathcal{F}_{i-1})\bigr)$$

defines a martingale sequence. We usually will think of $\sum_{i=1}^n \mathbb{E}(Y_i | \mathcal{F}_{i-1})$ as "the drift term" and the martingale sum $\sum_{i=1}^n Y_i$ we want to understand as "the random error."

### Azuma-type concentration inequality

We finish off this section with a concentration inequality for martingales.

**Theorem 14 (Azuma's inequality for martingales).** Let $(\Omega, \mathcal{F}, \mathbb{P})$ with $(\mathcal{F}_n)$ be a filtered probability space, and $(X_n)$ a martingale adapted to the filtration. Suppose that for each $n \in \mathbb{N}$ there are numbers $a_n, b_n$ such that $a_n \leq X_n - X_{n-1} \leq b_n$ holds surely. Then we have, for any $t > 0$ and $n \in \mathbb{N}$:

$$\mathbb{P}(X_n - X_0 \geq t) \leq \exp\!\left(\frac{-2t^2}{\sum_{i=1}^n (b_i - a_i)^2}\right)$$

$$\mathbb{P}(X_n - X_0 \leq -t) \leq \exp\!\left(\frac{-2t^2}{\sum_{i=1}^n (b_i - a_i)^2}\right).$$

If $(X_n)$ is only known to be a supermartingale, we still obtain the upper tail bound; if it is only known to be a submartingale, the lower tail bound still holds.

This looks exactly like Hoeffding's inequality — and indeed it reduces to Hoeffding when the increments $Y_n = X_n - X_{n-1}$ are independent. The key insight is that the increments **don't have to be independent**: the martingale property is enough.

*Proof sketch.* We calculate $\mathbb{E}(e^{s(X_n - X_0)})$ using the tower property (CE9) and "taking out what is known" (CE10) heavily. Conditioning first on $\mathcal{F}_{n-1}$, then $\mathcal{F}_{n-2}$, and so on:

$$\mathbb{E}(e^{s(X_n - X_0)} | \mathcal{F}_{n-1}) = e^{s(X_1 - X_0)} \cdots e^{s(X_{n-1} - X_{n-2})} \cdot \mathbb{E}(e^{s(X_n - X_{n-1})} | \mathcal{F}_{n-1}).$$

By the conditional reverse Jensen inequality (CE8), $\mathbb{E}(e^{s(X_n - X_{n-1})} | \mathcal{F}_{n-1}) \leq e^{s^2(b_n - a_n)^2/8}$ almost surely (the same Hoeffding Lemma bound, applied conditionally). Iterating $n$ times and taking $\mathbb{E}$:

$$\mathbb{E}(e^{s(X_n - X_0)}) \leq \prod_{i=1}^n e^{s^2(b_i - a_i)^2/8}.$$

This is the same MGF bound as in Hoeffding, so the same Chernoff optimization gives the result. We use that (by CE9 repeatedly) $\mathbb{E}(X_n) = \mathbb{E}(X_0)$, hence $\mathbb{E}(X_n - X_0) = 0$. $\square$

### Application: 3-term arithmetic progressions

**Theorem 15.** Let $X$ count the number of 3-AP in a $p$-random subset $S$ of $\{1, 2, \ldots, N\}$. Then we have $\mathbb{P}(|X - \mathbb{E}(X)| \geq t) \leq 2\exp(-8t^2 / 9N^3)$.

*Proof.* Let $(X_n)$ be the Doob martingale from Example 11. Because $\mathcal{F}_n$ is a finite collection of events all having positive probability, there is a unique version of $\mathbb{E}(X_n | \mathcal{F}_{n-1})$ for each $n$ (Exercise 1 from Level 13).

To bound $|X_n - X_{n-1}|$: we need to ask how great an effect revealing whether $n$ is in $S$ can have on the conditional expectation of $X$. It affects exactly all the 3-AP that use $n$. Since $n$ could appear as the first, second, or third number in such a progression (with common difference $d \in \{1, 2, \ldots, N/2\}$), there are at most $3N/2$ progressions that include $n$. So $-3N/2 \leq X_n - X_{n-1} \leq 3N/2$ surely.

Applying Theorem 14 and the union bound (over the positive and negative deviations):

$$\mathbb{P}(|X - \mathbb{E}(X)| \geq t) = \mathbb{P}(|X_N - X_0| \geq t) \leq 2\exp\!\left(\frac{-2t^2}{N(3N/2)^2}\right) = 2\exp\!\left(-\frac{8t^2}{9N^3}\right). \quad \square$$

## Key Results

### definition: Filtration and adapted process
**Number:** Definition 9
**Plain English:** A filtration is an increasing sequence of $\sigma$-algebras representing growing information over time. A process is adapted if at each time $n$, $X_n$ is measurable w.r.t. the information available at time $n$.
**Formal:** $\mathcal{F}_0 \subseteq \mathcal{F}_1 \subseteq \cdots \subseteq \mathcal{F}$; $(X_n)$ adapted means $X_n$ is $\mathcal{F}_n$-measurable for all $n$.
**Load-bearing:** yes

### definition: Martingale, supermartingale, submartingale
**Number:** Definition 10
**Plain English:** A martingale is a process whose best prediction for the next value, given the past, is the current value. Super/submartingales allow systematic downward/upward drift.
**Formal:** $(X_n)$ adapted to $(\mathcal{F}_n)$ is a martingale if $\mathbb{E}(|X_n|) < \infty$ and $\mathbb{E}(X_n|\mathcal{F}_{n-1}) = X_{n-1}$ a.s. for all $n$. Supermartingale: $\leq$. Submartingale: $\geq$.
**Load-bearing:** yes

### theorem: Azuma's inequality for martingales
**Number:** Theorem 14
**Plain English:** A martingale with bounded increments concentrates exponentially around its starting value — just like Hoeffding, but without requiring independence.
**Formal:** If $(X_n)$ is a martingale with $a_n \leq X_n - X_{n-1} \leq b_n$ surely, then $\mathbb{P}(X_n - X_0 \geq t) \leq \exp\!\left(-2t^2 / \sum(b_i - a_i)^2\right)$.
**Proof sketch:** Condition on $\mathcal{F}_{n-1}, \mathcal{F}_{n-2}, \ldots$ iteratively, applying the conditional Hoeffding lemma (CE8) at each step. Multiply the MGF bounds (CE10) and optimize $s$ (Chernoff).
**Key technique:** Tower property + conditional MGF bound + Chernoff optimization
**Depends on:** CE8, CE9, CE10, Lemma 3 (Level 10)
**Used by:** Theorem 15 (3-AP), ODE approximation (Level 18)
**Load-bearing:** yes

### theorem: 3-AP concentration bound
**Number:** Theorem 15
**Plain English:** The number of 3-term arithmetic progressions in a random subset concentrates around its expectation, with exponential tail bound.
**Formal:** $\mathbb{P}(|X - \mathbb{E}(X)| \geq t) \leq 2\exp(-8t^2/9N^3)$.
**Proof sketch:** Doob martingale on the 3-AP count. Each step changes by at most $3N/2$ (number of APs involving a given element). Apply Theorem 14.
**Key technique:** Doob martingale + bounded differences + Azuma
**Depends on:** Theorem 14, Exercise 1 (Level 13)
**Used by:** Combinatorial applications of concentration
**Load-bearing:** no

## Exercises

### exercise: Sum of zero-mean increments is a martingale
**Number:** Exercise 7
**Difficulty:** warm-up
**Tags:** martingale, adapted-process, CE-properties

**Question:**
Prove that if $Y_1, Y_2, \ldots$ is a sequence of random variables such that for each $n \in \mathbb{N}$ we have $\mathbb{E}(|Y_n|) < \infty$, $\mathbb{E}(Y_n | \mathcal{F}_{n-1}) = 0$, and $Y_n$ is $\mathcal{F}_n$-measurable, then $X_n = \sum_{k=1}^n Y_k$ defines a process adapted to $(\mathcal{F}_n)$, and this process is a martingale.

**Hint 1:** Show adaptedness
$X_{n-1}$ is $\mathcal{F}_{n-1}$-measurable. Since $\mathcal{F}_{n-1} \subseteq \mathcal{F}_n$, it is also $\mathcal{F}_n$-measurable. So $X_n = X_{n-1} + Y_n$ is a sum of $\mathcal{F}_n$-measurable random variables.

**Hint 2:** Use CE1 and CE2
$\mathbb{E}(X_n | \mathcal{F}_{n-1}) = \mathbb{E}(X_{n-1} + Y_n | \mathcal{F}_{n-1}) = \mathbb{E}(X_{n-1} | \mathcal{F}_{n-1}) + \mathbb{E}(Y_n | \mathcal{F}_{n-1})$. Apply CE1 to the first term and the hypothesis to the second.

**Solution:**
**Adaptedness:** For $n = 0$: $X_0$ is the constant 0 function which is $\mathcal{F}_0$-measurable (whatever $\mathcal{F}_0$ is). For the remaining statements by induction: $X_{n-1}$ is $\mathcal{F}_{n-1}$-measurable, so because $\mathcal{F}_{n-1} \subseteq \mathcal{F}_n$ it is also $\mathcal{F}_n$-measurable, and then $X_n = X_{n-1} + Y_n$ is a sum of $\mathcal{F}_n$-measurable random variables, so $\mathcal{F}_n$-measurable.

**$L^1$ property:** $\mathbb{E}(|X_n|) \leq \sum_{i=1}^n \mathbb{E}(|Y_i|) < \infty$ (triangle inequality, finite sum of real numbers).

**Martingale property:** Given $n \in \mathbb{N}$:

$$\mathbb{E}(X_n | \mathcal{F}_{n-1}) = \mathbb{E}(X_{n-1} + Y_n | \mathcal{F}_{n-1}) = X_{n-1} + \mathbb{E}(Y_n | \mathcal{F}_{n-1}) = X_{n-1}$$

where the second equality is linearity of conditional expectation (CE2) to split the conditional expectation of the sum, then (CE1) to evaluate the first part using that $X_{n-1}$ is $\mathcal{F}_{n-1}$-measurable. $\square$

### exercise: Doob construction gives a martingale
**Number:** Exercise 8
**Difficulty:** warm-up
**Tags:** martingale, Doob-construction, tower-property, Jensen

**Question:**
Prove that the Doob construction indeed gives a martingale: if $X$ is a random variable with $\mathbb{E}(|X|) < \infty$ and $(\mathcal{F}_n)$ is a filtration, then $X_n = \mathbb{E}(X | \mathcal{F}_n)$ is a martingale.

**Hint 1:** Check adaptedness and $L^1$
Adaptedness is immediate from definition of CE (condition (ii)). For $L^1$: use the conditional Jensen inequality with $g(x) = |x|$.

**Hint 2:** Apply the tower property
$\mathbb{E}(X_n | \mathcal{F}_{n-1}) = \mathbb{E}(\mathbb{E}(X|\mathcal{F}_n) | \mathcal{F}_{n-1}) = \mathbb{E}(X | \mathcal{F}_{n-1}) = X_{n-1}$ by CE9 (since $\mathcal{F}_{n-1} \subseteq \mathcal{F}_n$).

**Solution:**
That $(X_n)_{n \geq 0}$ is adapted to the filtration $(\mathcal{F}_n)_{n \geq 0}$ is immediate from the definition of conditional expectation, property (ii).

Given $n \in \mathbb{N}$ we have

$$\mathbb{E}(X_n | \mathcal{F}_{n-1}) = \mathbb{E}(\mathbb{E}(X | \mathcal{F}_n) | \mathcal{F}_{n-1}) = \mathbb{E}(X | \mathcal{F}_{n-1}) = X_{n-1}$$

where the second equality is the tower property (CE9).

We actually need to do a little work here to check the $L_1$ property:

$$\mathbb{E}(|X_n|) = \mathbb{E}(|\mathbb{E}(X|\mathcal{F}_n)|) \leq \mathbb{E}(\mathbb{E}(|X| \mid \mathcal{F}_n)) = \mathbb{E}(|X|) < \infty$$

as required. The inequality is the conditional Jensen inequality (CE8), since $x \mapsto |x|$ is a convex function. And the final inequality is the tower property (CE9): formally, let $\mathcal{G} = \{\emptyset, \Omega\}$, then $\mathbb{E}(|X| \mid \mathcal{G}) = \mathbb{E}(|X|)$ by CE11 (all $\sigma$-algebras are independent of $\mathcal{G}$), so $\mathbb{E}(\mathbb{E}(|X| \mid \mathcal{F}_n)) = \mathbb{E}(\mathbb{E}(|X| \mid \mathcal{F}_n) | \mathcal{G}) = \mathbb{E}(|X| \mid \mathcal{G}) = \mathbb{E}(|X|)$. $\square$
