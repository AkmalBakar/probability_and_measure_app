---
level: 10
title: "Hoeffding's Inequality"
status: wip
notes: 3
prerequisites: [9]
---

# Level 10: Hoeffding's Inequality

## Reading

We have seen that Markov's inequality converts first-moment information into a tail bound, and Chebyshev's inequality does the same with the variance. Both are universal but weak: Markov gives $\mathbb{P}(X \geq t) \leq \mathbb{E}(X)/t$, which decays only as $1/t$, and Chebyshev gives $1/t^2$. There is no reason, in general, for a random variable $X$ to be "close" to its expectation.

But many interesting random variables are **sums of independent bounded terms**, and these turn out to concentrate *exponentially* near their mean. This is a qualitative leap over Markov and Chebyshev, and it is the starting point for modern concentration inequalities.

### The Central Limit Theorem (stated without proof)

The CLT explains *why* sums concentrate, at least heuristically.

**Theorem 1 (CLT).** Let $Y_1, Y_2, \ldots$ be iid random variables with $\mathbb{E}(Y_i) = \mu$ and $\operatorname{Var}(Y_i) = \sigma^2 < \infty$. Let $X_n = Y_1 + \cdots + Y_n$. Then

$$\frac{X_n - n\mu}{\sigma\sqrt{n}} \xrightarrow{d} N(0, 1).$$

In words: the centred, rescaled sum converges in distribution to a standard Gaussian. The Gaussian tail decays like $e^{-t^2/2}$, which is far faster than anything Markov or Chebyshev can give. However, the CLT is an *asymptotic* statement -- it tells us about the limit $n \to \infty$ but says nothing quantitative about any fixed $n$. This course focuses on **quantitative, non-asymptotic tail bounds**. We will not prove the CLT.

### Hoeffding's inequality

The main result of this level is a *finite-sample* exponential tail bound for sums of independent bounded random variables.

**Theorem 2 (Hoeffding's inequality).** Let $Y_1, \ldots, Y_n$ be independent random variables with $a_i \leq Y_i \leq b_i$ almost surely. Let $X = Y_1 + \cdots + Y_n$. Then for any $t > 0$:

$$\mathbb{P}(X - \mathbb{E}(X) \geq t) \leq \exp\!\left(\frac{-2t^2}{\sum_{i=1}^n (b_i - a_i)^2}\right),$$

$$\mathbb{P}(X - \mathbb{E}(X) \leq -t) \leq \exp\!\left(\frac{-2t^2}{\sum_{i=1}^n (b_i - a_i)^2}\right).$$

Notice the shape of the bound: it looks like a Gaussian tail $e^{-ct^2}$. The denominator $\sum (b_i - a_i)^2$ plays the role of the variance, which makes sense since $(b_i - a_i)^2/4$ is an upper bound for $\operatorname{Var}(Y_i)$ when $Y_i$ is supported on $[a_i, b_i]$. The key hypotheses are **independence** and **almost-sure boundedness**. Neither Markov nor Chebyshev required independence; Hoeffding's inequality is powerful precisely because it exploits the independence structure.

### Proof strategy: two lemmas

The proof of Hoeffding's inequality factors into two clean steps, each captured by a lemma. The first controls the moment generating function (MGF) of the sum; the second converts MGF control into a tail bound.

### Lemma 3: MGF bound for sums of bounded random variables

**Lemma 3.** Let $Y_1, \ldots, Y_n$ be independent random variables with $\mathbb{E}(Y_i) = 0$ and $a_i \leq Y_i \leq b_i$ almost surely. Let $X = Y_1 + \cdots + Y_n$. Then for all $s > 0$:

$$\mathbb{E}(e^{sX}) \leq \exp\!\left(\frac{s^2}{8} \sum_{i=1}^n (b_i - a_i)^2\right).$$

The proof proceeds in two stages. First, we bound $\mathbb{E}(e^{sY_i})$ for a single zero-mean bounded random variable. Second, we use independence to multiply.

**Stage 1: Bounding a single MGF.** Fix $i$ and write $a = a_i$, $b = b_i$, $d = b - a > 0$. Since $a \leq Y_i \leq b$, we can write $Y_i$ as a convex combination:

$$Y_i = \frac{b - Y_i}{d} \cdot a + \frac{Y_i - a}{d} \cdot b.$$

The function $x \mapsto e^{sx}$ is convex, so by convexity (this is the "reverse Jensen" step -- we are using that $Y_i$ lies in $[a, b]$):

$$e^{sY_i} \leq \frac{b - Y_i}{d} \, e^{sa} + \frac{Y_i - a}{d} \, e^{sb}.$$

Taking expectations and using $\mathbb{E}(Y_i) = 0$:

$$\mathbb{E}(e^{sY_i}) \leq \frac{b}{d} \, e^{sa} + \frac{-a}{d} \, e^{sb} = \frac{b \, e^{sa} - a \, e^{sb}}{d}.$$

Now define the auxiliary function

$$g(s) = -sa + \log\!\left(\frac{b - a \, e^{sd}}{d}\right),$$

so that $\mathbb{E}(e^{sY_i}) \leq e^{g(s)}$ (after some algebra, the right-hand side above equals $e^{g(s)}$). We claim $g(s) \leq d^2 s^2 / 8$.

To verify this, compute:
- $g(0) = \log(d/d) = 0$.
- $g'(0) = 0$ (using $\mathbb{E}(Y_i) = 0$, which forces the derivative to vanish).
- $g''(s) \leq d^2/4$ for all $s$.

The bound on $g''$ comes from the fact that $g''(s)$ is the variance of a certain Bernoulli-like distribution on $\{a, b\}$ with weights depending on $s$, and a random variable supported on an interval of length $d$ has variance at most $d^2/4$.

Since $g(0) = 0$, $g'(0) = 0$, and $g''(s) \leq d^2/4$, Taylor's theorem with remainder gives:

$$g(s) \leq \frac{d^2}{4} \cdot \frac{s^2}{2} = \frac{d^2 s^2}{8} = \frac{(b_i - a_i)^2 s^2}{8}.$$

Therefore $\mathbb{E}(e^{sY_i}) \leq \exp\!\bigl((b_i - a_i)^2 s^2 / 8\bigr)$.

**Stage 2: Using independence.** Since $Y_1, \ldots, Y_n$ are independent, so are $e^{sY_1}, \ldots, e^{sY_n}$, and thus:

$$\mathbb{E}(e^{sX}) = \mathbb{E}\!\left(\prod_{i=1}^n e^{sY_i}\right) = \prod_{i=1}^n \mathbb{E}(e^{sY_i}) \leq \prod_{i=1}^n \exp\!\left(\frac{(b_i - a_i)^2 s^2}{8}\right) = \exp\!\left(\frac{s^2}{8} \sum_{i=1}^n (b_i - a_i)^2\right).$$

The first equality uses the multiplicativity of expectation for independent random variables (Theorem 22 / Exercise 15 from Level 9).

### Lemma 4: The Chernoff method (sub-Gaussian tail bound)

**Lemma 4.** Let $X$ be a random variable satisfying the **sub-Gaussian condition**: there exists $\lambda > 0$ such that for all $s > 0$,

$$\mathbb{E}(e^{sX}) \leq \exp\!\bigl(s \, \mathbb{E}(X) + \lambda s^2\bigr).$$

Then for any $t > 0$:

$$\mathbb{P}(X \geq \mathbb{E}(X) + t) \leq \exp\!\left(\frac{-t^2}{4\lambda}\right).$$

The idea is beautifully simple: exponentiating converts an additive statement ($X \geq \mathbb{E}(X) + t$) into a multiplicative one ($e^{sX} \geq e^{s(\mathbb{E}(X) + t)}$), and then we apply Markov's inequality and optimize over the free parameter $s$. This strategy is called the **Chernoff method** or **exponential Markov trick**.

**Proof.** For any $s > 0$:

$$\mathbb{P}(X \geq \mathbb{E}(X) + t) = \mathbb{P}(e^{sX} \geq e^{s(\mathbb{E}(X) + t)}) \leq \frac{\mathbb{E}(e^{sX})}{e^{s(\mathbb{E}(X) + t)}} \leq \frac{\exp(s \, \mathbb{E}(X) + \lambda s^2)}{e^{s(\mathbb{E}(X) + t)}} = \exp(\lambda s^2 - st).$$

The first inequality is Markov's inequality applied to the non-negative random variable $e^{sX}$. The second uses the sub-Gaussian hypothesis.

We now have the bound $\exp(\lambda s^2 - st)$ for *every* $s > 0$, so we minimize over $s$. The exponent $h(s) = \lambda s^2 - st$ is a quadratic in $s$ with minimum at $s^* = t/(2\lambda)$:

$$h(s^*) = \lambda \cdot \frac{t^2}{4\lambda^2} - \frac{t^2}{2\lambda} = \frac{t^2}{4\lambda} - \frac{t^2}{2\lambda} = -\frac{t^2}{4\lambda}.$$

Therefore $\mathbb{P}(X \geq \mathbb{E}(X) + t) \leq \exp(-t^2/(4\lambda))$.

### Proof of Theorem 2

We now assemble the two lemmas to prove Hoeffding's inequality.

**Upper tail.** Define $Z_i = Y_i - \mathbb{E}(Y_i)$. Then $\mathbb{E}(Z_i) = 0$ and $Z_i$ takes values in $[a_i - \mathbb{E}(Y_i), \, b_i - \mathbb{E}(Y_i)]$, an interval of length $b_i - a_i$ (the shift does not change the range). Also $X - \mathbb{E}(X) = Z_1 + \cdots + Z_n$.

Apply Lemma 3 to $Z_1, \ldots, Z_n$: for all $s > 0$,

$$\mathbb{E}\bigl(e^{s(X - \mathbb{E}(X))}\bigr) \leq \exp\!\left(\frac{s^2}{8} \sum_{i=1}^n (b_i - a_i)^2\right).$$

This says $X - \mathbb{E}(X)$ satisfies the sub-Gaussian condition with mean $0$ and $\lambda = \frac{1}{8}\sum (b_i - a_i)^2$. Apply Lemma 4:

$$\mathbb{P}(X - \mathbb{E}(X) \geq t) \leq \exp\!\left(\frac{-t^2}{4 \cdot \frac{1}{8}\sum (b_i - a_i)^2}\right) = \exp\!\left(\frac{-2t^2}{\sum_{i=1}^n (b_i - a_i)^2}\right).$$

**Lower tail.** Apply the same argument to $-X = (-Y_1) + \cdots + (-Y_n)$. The variable $-Y_i$ is bounded in $[-b_i, -a_i]$, so its range is still $b_i - a_i$. Then $\mathbb{P}(X - \mathbb{E}(X) \leq -t) = \mathbb{P}(-X - \mathbb{E}(-X) \geq t)$, which is bounded by the same expression.

### Key application pattern: Hoeffding plus union bound

Hoeffding's inequality is most powerful when combined with a **union bound**. A typical scenario: you have $m$ random variables $X^{(1)}, \ldots, X^{(m)}$, each of which is a sum of independent bounded terms. Hoeffding tells you that each individual $X^{(j)}$ is within $t$ of its expectation with probability at least $1 - 2e^{-2t^2/C_j}$. The union bound then says

$$\mathbb{P}\!\left(\exists j : |X^{(j)} - \mathbb{E}(X^{(j)})| \geq t\right) \leq \sum_{j=1}^m 2\exp\!\left(\frac{-2t^2}{C_j}\right).$$

Even if $m$ is large (even exponential in some parameter), the exponential decay from Hoeffding can still win, giving simultaneous concentration for all $m$ variables.

## Key Results

### theorem: Central Limit Theorem (stated without proof)
**Number:** Theorem 1
**Plain English:** The normalized sum of iid random variables converges in distribution to a Gaussian. This motivates the search for quantitative concentration bounds but is not itself a tool used in this course.
**Formal:** Let $Y_1, Y_2, \ldots$ be iid with $\mathbb{E}(Y_i) = \mu$ and $\operatorname{Var}(Y_i) = \sigma^2 < \infty$. Let $X_n = \sum_{i=1}^n Y_i$. Then $(X_n - n\mu)/(\sigma\sqrt{n}) \xrightarrow{d} N(0,1)$.
**Key technique:** Not proved in this course
**Load-bearing:** no

### theorem: Hoeffding's inequality
**Number:** Theorem 2
**Plain English:** Sums of independent bounded random variables concentrate exponentially around their mean. The tail probability decays like a Gaussian, with the ranges $(b_i - a_i)$ playing the role of standard deviations.
**Formal:** Let $Y_1, \ldots, Y_n$ be independent with $a_i \leq Y_i \leq b_i$ a.s. Let $X = \sum_{i=1}^n Y_i$. Then for any $t > 0$:
$$\mathbb{P}(X - \mathbb{E}(X) \geq t) \leq \exp\!\left(\frac{-2t^2}{\sum_{i=1}^n (b_i - a_i)^2}\right), \quad \mathbb{P}(X - \mathbb{E}(X) \leq -t) \leq \exp\!\left(\frac{-2t^2}{\sum_{i=1}^n (b_i - a_i)^2}\right).$$
**Proof sketch:**
1. Centre: replace $Y_i$ by $Z_i = Y_i - \mathbb{E}(Y_i)$ (zero mean, same range)
2. Apply Lemma 3 to get $\mathbb{E}(e^{s(X - \mathbb{E}(X))}) \leq \exp(s^2 \sum(b_i - a_i)^2 / 8)$
3. Apply Lemma 4 with $\lambda = \sum(b_i - a_i)^2 / 8$ to get the upper tail
4. For the lower tail, apply the same argument to $-X$
**Key technique:** MGF bound (Lemma 3) + Chernoff method (Lemma 4)
**Load-bearing:** yes

### lemma: MGF bound for bounded random variables
**Number:** Lemma 3
**Plain English:** If you have independent zero-mean random variables, each trapped in a known interval, then the moment generating function of their sum is controlled by a Gaussian-like expression involving the interval widths.
**Formal:** Let $Y_1, \ldots, Y_n$ be independent with $\mathbb{E}(Y_i) = 0$ and $a_i \leq Y_i \leq b_i$ a.s. Let $X = \sum Y_i$. Then for all $s > 0$:
$$\mathbb{E}(e^{sX}) \leq \exp\!\left(\frac{s^2}{8} \sum_{i=1}^n (b_i - a_i)^2\right).$$
**Proof sketch:**
1. For each $i$: use convexity of $e^{sx}$ and $Y_i \in [a_i, b_i]$ to get $\mathbb{E}(e^{sY_i}) \leq (b \, e^{sa} - a \, e^{sb})/d$
2. Define $g(s)$ with $g(0) = g'(0) = 0$ and $g''(s) \leq d^2/4$, so $g(s) \leq d^2 s^2/8$
3. Hence $\mathbb{E}(e^{sY_i}) \leq \exp((b_i - a_i)^2 s^2/8)$
4. By independence (multiplicativity of expectation): multiply across $i$
**Key technique:** Reverse Jensen inequality, Taylor bound on auxiliary function, independence
**Load-bearing:** yes

### lemma: Sub-Gaussian / Chernoff method
**Number:** Lemma 4
**Plain English:** If the moment generating function of a random variable is controlled by a Gaussian-like expression, then applying Markov's inequality to $e^{sX}$ and optimizing over $s$ gives an exponential tail bound.
**Formal:** Suppose $\mathbb{E}(e^{sX}) \leq \exp(s \, \mathbb{E}(X) + \lambda s^2)$ for all $s > 0$. Then:
$$\mathbb{P}(X \geq \mathbb{E}(X) + t) \leq \exp\!\left(\frac{-t^2}{4\lambda}\right).$$
**Proof sketch:**
1. $\mathbb{P}(X \geq \mathbb{E}(X) + t) = \mathbb{P}(e^{sX} \geq e^{s(\mathbb{E}(X)+t)}) \leq \mathbb{E}(e^{sX}) \, e^{-s(\mathbb{E}(X)+t)}$
2. Substitute the MGF bound: $\leq \exp(\lambda s^2 - st)$
3. Optimize: $s^* = t/(2\lambda)$ gives $\exp(-t^2/(4\lambda))$
**Key technique:** Exponential Markov (Chernoff bound), optimization over free parameter
**Load-bearing:** yes

## Exercises

### exercise: Prove Lemma 3 (MGF bound for bounded random variables)
**Number:** Exercise 1
**Difficulty:** standard
**Tags:** MGF, independence, convexity, Taylor-bound, concentration

**Question:**
Let $Y_1, \ldots, Y_n$ be independent random variables with $\mathbb{E}(Y_i) = 0$ and $a_i \leq Y_i \leq b_i$ almost surely. Let $X = Y_1 + \cdots + Y_n$. Prove that for all $s > 0$:

$$\mathbb{E}(e^{sX}) \leq \exp\!\left(\frac{s^2}{8} \sum_{i=1}^n (b_i - a_i)^2\right).$$

*Hint: handle a single $Y_i$ first. Use convexity of the exponential, then define an auxiliary function $g(s)$ and show $g(0) = g'(0) = 0$, $g''(s) \leq d^2/4$.*

**Hint 1:** Bound a single MGF using convexity
Fix $i$ and write $a = a_i$, $b = b_i$, $d = b - a$. Since $Y_i \in [a, b]$, write $Y_i = \frac{b - Y_i}{d} \cdot a + \frac{Y_i - a}{d} \cdot b$. Apply convexity of $e^{sx}$: $e^{sY_i} \leq \frac{b - Y_i}{d} e^{sa} + \frac{Y_i - a}{d} e^{sb}$. Take expectations using $\mathbb{E}(Y_i) = 0$.

**Hint 2:** Define $g(s)$ and use Taylor's theorem
After taking expectations you should get $\mathbb{E}(e^{sY_i}) \leq \frac{b \, e^{sa} - a \, e^{sb}}{d}$. Take the logarithm and define $g(s) = -sa + \log\bigl(\frac{b - a \, e^{sd}}{d}\bigr)$. Check that $g(0) = 0$, $g'(0) = 0$, and show $g''(s) \leq d^2/4$ by interpreting $g''(s)$ as a variance. By Taylor's theorem with Lagrange remainder: $g(s) = g(0) + g'(0)s + \frac{1}{2}g''(\xi)s^2 \leq \frac{d^2 s^2}{8}$.

**Solution:**
We prove the bound in two stages: first for a single random variable, then for the sum.

**Stage 1: A single bounded zero-mean random variable.**

Fix $i$ and write $a = a_i$, $b = b_i$, $d = b - a > 0$. Since $a \leq Y_i \leq b$, we can express $Y_i$ as a convex combination of the endpoints:

$$Y_i = \frac{b - Y_i}{d} \cdot a + \frac{Y_i - a}{d} \cdot b.$$

Since $x \mapsto e^{sx}$ is convex, we have

$$e^{sY_i} \leq \frac{b - Y_i}{d} \, e^{sa} + \frac{Y_i - a}{d} \, e^{sb}.$$

Taking expectations and using $\mathbb{E}(Y_i) = 0$:

$$\mathbb{E}(e^{sY_i}) \leq \frac{b - \mathbb{E}(Y_i)}{d} \, e^{sa} + \frac{\mathbb{E}(Y_i) - a}{d} \, e^{sb} = \frac{b}{d} \, e^{sa} + \frac{-a}{d} \, e^{sb} = \frac{b \, e^{sa} - a \, e^{sb}}{d}.$$

Now define the auxiliary function

$$g(s) = -sa + \log\!\left(\frac{b - a \, e^{sd}}{d}\right),$$

so that $\frac{b \, e^{sa} - a \, e^{sb}}{d} = e^{g(s)}$ (multiply numerator and denominator by $e^{-sa}$ and verify). We claim $g(s) \leq d^2 s^2/8$.

**Verifying $g(0) = 0$:** We have $g(0) = 0 + \log\!\bigl(\frac{b - a}{d}\bigr) = \log(1) = 0$.

**Verifying $g'(0) = 0$:** Differentiating, $g'(s) = -a + \frac{-a \, d \, e^{sd}}{b - a \, e^{sd}}$. At $s = 0$: $g'(0) = -a + \frac{-ad}{b - a} = -a + \frac{-ad}{d} = -a + (-a) = -a - a$... Let us be more careful. We have $g'(s) = -a - \frac{ad \, e^{sd}}{b - ae^{sd}}$. At $s = 0$: $g'(0) = -a - \frac{ad}{b - a} = -a - \frac{ad}{d} = -a - a$. This does not equal zero unless $a = 0$.

Let us rewrite more carefully. Set $p = -a/d$ and $q = b/d$, so $p + q = 1$, $p, q \geq 0$. Then

$$\frac{b \, e^{sa} - a \, e^{sb}}{d} = q \, e^{sa} + p \, e^{sb}.$$

Define instead $h(s) = \log(q \, e^{sa} + p \, e^{sb})$. We want to show $h(s) \leq s \, \mathbb{E}(Y_i) + d^2 s^2/8 = d^2 s^2/8$ (since $\mathbb{E}(Y_i) = 0$). Equivalently, define $\varphi(u) = \log(q \, e^{-pu} + p \, e^{qu})$ where $u = sd$ (substituting $a = -pd$, $b = qd$). Then:

$$\varphi(0) = \log(q + p) = \log(1) = 0.$$

$$\varphi'(u) = \frac{-pq \, e^{-pu} + pq \, e^{qu}}{q \, e^{-pu} + p \, e^{qu}}.$$

At $u = 0$: $\varphi'(0) = \frac{-pq + pq}{q + p} = 0$. Good.

For the second derivative:

$$\varphi''(u) = \frac{(p^2 q \, e^{-pu} + pq^2 \, e^{qu})(q \, e^{-pu} + p \, e^{qu}) - (-pq \, e^{-pu} + pq \, e^{qu})^2}{(q \, e^{-pu} + p \, e^{qu})^2}.$$

Let $w = q \, e^{-pu} + p \, e^{qu}$. The numerator simplifies (after standard algebra) to $pq(e^{qu} + e^{-pu})^2 / w^2 - (pq)^2(e^{qu} - e^{-pu})^2/w^2$... More elegantly, one can interpret $\varphi''(u)$ as the variance of a random variable $Z_u$ that takes value $q$ with probability $p \, e^{qu}/w$ and value $-p$ with probability $q \, e^{-pu}/w$. Since $Z_u$ is supported on an interval of length $q + p = 1$, its variance is at most $1/4$. Therefore $\varphi''(u) \leq 1/4$ for all $u$.

By Taylor's theorem with Lagrange remainder, there exists $\xi$ between $0$ and $u$ such that

$$\varphi(u) = \varphi(0) + \varphi'(0) \, u + \frac{1}{2}\varphi''(\xi) \, u^2 \leq \frac{u^2}{8}.$$

Substituting $u = sd$:

$$h(s) = \varphi(sd) \leq \frac{s^2 d^2}{8} = \frac{(b_i - a_i)^2 s^2}{8}.$$

Therefore $\mathbb{E}(e^{sY_i}) \leq e^{h(s)} \leq \exp\!\bigl((b_i - a_i)^2 s^2/8\bigr)$.

**Stage 2: Using independence to handle the sum.**

Since $Y_1, \ldots, Y_n$ are independent, the random variables $e^{sY_1}, \ldots, e^{sY_n}$ are independent (as compositions of independent random variables with a measurable function). By the multiplicativity of expectation for independent random variables:

$$\mathbb{E}(e^{sX}) = \mathbb{E}\!\left(\prod_{i=1}^n e^{sY_i}\right) = \prod_{i=1}^n \mathbb{E}(e^{sY_i}) \leq \prod_{i=1}^n \exp\!\left(\frac{(b_i - a_i)^2 s^2}{8}\right) = \exp\!\left(\frac{s^2}{8}\sum_{i=1}^n (b_i - a_i)^2\right). \qquad \blacksquare$$

### exercise: Prove Lemma 4 (Chernoff method / sub-Gaussian tail bound)
**Number:** Exercise 2
**Difficulty:** warm-up
**Tags:** Chernoff-bound, Markov-inequality, optimization, MGF, concentration

**Question:**
Suppose $X$ is a random variable satisfying $\mathbb{E}(e^{sX}) \leq \exp(s \, \mathbb{E}(X) + \lambda s^2)$ for all $s > 0$, where $\lambda > 0$. Prove that for any $t > 0$:

$$\mathbb{P}(X \geq \mathbb{E}(X) + t) \leq \exp\!\left(\frac{-t^2}{4\lambda}\right).$$

*Hint: apply Markov's inequality to $e^{sX}$ for $s > 0$, substitute the MGF bound, then optimize the resulting expression over $s$.*

**Hint 1:** Apply Markov to the exponential
For any $s > 0$, the event $\{X \geq \mathbb{E}(X) + t\}$ is the same as $\{e^{sX} \geq e^{s(\mathbb{E}(X) + t)}\}$. Apply Markov's inequality to the non-negative random variable $e^{sX}$.

**Hint 2:** Optimize over $s$
After substituting the MGF hypothesis, you should have the bound $\exp(\lambda s^2 - st)$. This is a quadratic in $s$ -- find its minimum by setting the derivative to zero. Check that the minimizer $s^* = t/(2\lambda) > 0$.

**Solution:**
Fix $t > 0$ and let $s > 0$ be a free parameter (to be chosen later).

**Step 1: Exponential Markov.** Since $x \mapsto e^{sx}$ is monotone increasing, for any $s > 0$:

$$\{X \geq \mathbb{E}(X) + t\} = \{e^{sX} \geq e^{s(\mathbb{E}(X) + t)}\}.$$

The random variable $e^{sX}$ is non-negative, so Markov's inequality gives:

$$\mathbb{P}(X \geq \mathbb{E}(X) + t) = \mathbb{P}\bigl(e^{sX} \geq e^{s(\mathbb{E}(X) + t)}\bigr) \leq \frac{\mathbb{E}(e^{sX})}{e^{s(\mathbb{E}(X) + t)}}.$$

**Step 2: Substitute the MGF bound.** By hypothesis, $\mathbb{E}(e^{sX}) \leq \exp(s \, \mathbb{E}(X) + \lambda s^2)$. Therefore:

$$\mathbb{P}(X \geq \mathbb{E}(X) + t) \leq \frac{\exp(s \, \mathbb{E}(X) + \lambda s^2)}{\exp(s \, \mathbb{E}(X) + st)} = \exp(\lambda s^2 - st).$$

**Step 3: Optimize over $s$.** The exponent $h(s) = \lambda s^2 - st$ is a upward-opening parabola in $s$. Its minimum occurs at

$$s^* = \frac{t}{2\lambda} > 0$$

(this is in the allowed range $s > 0$). Substituting:

$$h(s^*) = \lambda \cdot \frac{t^2}{4\lambda^2} - \frac{t^2}{2\lambda} = \frac{t^2}{4\lambda} - \frac{t^2}{2\lambda} = -\frac{t^2}{4\lambda}.$$

Therefore:

$$\mathbb{P}(X \geq \mathbb{E}(X) + t) \leq \exp\!\left(-\frac{t^2}{4\lambda}\right). \qquad \blacksquare$$
