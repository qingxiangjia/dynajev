/* DynaJev public-site content configuration. */
const METHODS = Object.freeze({
  jev_only: "Jev-only",
  prefix_completion: "Prefix–Completion",
  prefix_per_step: "Prefix–Per-Step",
  prefix_feedback: "Prefix–Feedback",
  handoff_completion: "Handoff–Completion",
  handoff_per_step: "Handoff–Per-Step",
  dynajev: "DynaJev",
});

const METHOD_ORDER = Object.freeze([
  "jev_only",
  "prefix_completion",
  "prefix_per_step",
  "prefix_feedback",
  "handoff_completion",
  "handoff_per_step",
  "dynajev",
]);

const RECORDING_OUTPUT_BUDGET = 2304;

function recording({ methodId, stem, seed, endStep, outcome }) {
  return {
    methodId,
    src: `./assets/videos/${stem}.mp4`,
    poster: `./assets/posters/${stem}-poster.jpg`,
    seed,
    skill: "none",
    outputTokenBudget: RECORDING_OUTPUT_BUDGET,
    outcome,
    endStep,
  };
}

const DYNAJEV_CONFIG = {
  resources: {
    codeUrl: "https://anonymous.4open.science/r/DynaJev-1565/",
  },
  videoGroups: [
    {
      id: "snake_main",
      environmentKey: "snake",
      environment: "Snake",
      difficulty: "Hard",
      title: "Snake-Hard · Handoff policy comparison",
      description: "A same-seed, no-skill comparison of three Handoff policies. In this selected seed 2 episode, DynaJev reaches reward 4 over 24 actions.",
      videos: [
        recording({ methodId: "handoff_completion", stem: "snake-hard-seed2-handoff-completion", seed: 2, endStep: 8, outcome: "Reward 1 · Game over" }),
        recording({ methodId: "handoff_per_step", stem: "snake-hard-seed2-handoff-per-step", seed: 2, endStep: 17, outcome: "Reward 3 · Game over" }),
        recording({ methodId: "dynajev", stem: "snake-hard-seed2-dynajev", seed: 2, endStep: 24, outcome: "Reward 4 · Game over" }),
      ],
    },
    {
      id: "freeway_main",
      environmentKey: "freeway",
      environment: "Freeway",
      difficulty: "Easy",
      title: "Freeway-Easy · Handoff policy comparison",
      description: "A same-seed, no-skill crossing comparison. In seed 3, Per-Step succeeds in 11 actions, DynaJev succeeds in 17, and Completion reaches the 30-action recording limit without crossing.",
      videos: [
        recording({ methodId: "handoff_completion", stem: "freeway-easy-seed3-handoff-completion", seed: 3, endStep: 30, outcome: "Reward 70 · No crossing at recording limit" }),
        recording({ methodId: "handoff_per_step", stem: "freeway-easy-seed3-handoff-per-step", seed: 3, endStep: 11, outcome: "Reward 89 · Success" }),
        recording({ methodId: "dynajev", stem: "freeway-easy-seed3-dynajev", seed: 3, endStep: 17, outcome: "Reward 83 · Success" }),
      ],
    },
    {
      id: "overcooked_main",
      environmentKey: "overcooked",
      environment: "Overcooked",
      difficulty: "Easy",
      title: "Overcooked-Easy · Handoff policy comparison",
      description: "A same-seed, no-skill comparison. At the 60-action recording limit, Completion and Per-Step each leave a pot with two onions and make no deliveries, while DynaJev completes one delivery and finishes with two onions in each pot.",
      videos: [
        recording({ methodId: "handoff_completion", stem: "overcooked-easy-seed4-handoff-completion", seed: 4, endStep: 60, outcome: "Reward 0 · 2 onions in pot · No delivery" }),
        recording({ methodId: "handoff_per_step", stem: "overcooked-easy-seed4-handoff-per-step", seed: 4, endStep: 60, outcome: "Reward 3 · 2 onions in pot · No delivery" }),
        recording({ methodId: "dynajev", stem: "overcooked-easy-seed4-dynajev", seed: 4, endStep: 60, outcome: "Reward 28 · 1 delivery · 2 onions in each pot" }),
      ],
    },
    {
      id: "pvz_main",
      environmentKey: "pvz",
      environment: "Plants vs. Zombies",
      difficulty: "Hard",
      title: "Plants vs. Zombies-Hard · Defense comparison",
      description: "A same-seed, no-skill defense comparison. In seed 2, DynaJev survives to the 89-action horizon, while Per-Step is breached after action 61.",
      rightsNotice: "Local preview only: this footage contains third-party game imagery. Confirm redistribution permission before any public deployment.",
      videos: [
        recording({ methodId: "handoff_per_step", stem: "pvz-hard-seed2-handoff-per-step", seed: 2, endStep: 61, outcome: "Reward 2,600 · Garden breached" }),
        recording({ methodId: "dynajev", stem: "pvz-hard-seed2-dynajev", seed: 2, endStep: 89, outcome: "Reward 2,720 · Survived to horizon" }),
      ],
    },
  ],
};

/* Every result view reads from this single data source. */
const RESULTS = {
  snake: {
    without: [
      { methodId: "jev_only", food: 0.50, survival: 0.00, slowCalls: 0.00 },
      { methodId: "prefix_completion", food: 2.17, survival: 0.00, slowCalls: 2.50 },
      { methodId: "prefix_per_step", food: 6.83, survival: 50.00, slowCalls: 26.83 },
      { methodId: "prefix_feedback", food: 4.67, survival: 16.67, slowCalls: 10.50 },
      { methodId: "handoff_completion", food: 5.50, survival: 50.00, slowCalls: 4.17 },
      { methodId: "handoff_per_step", food: 5.17, survival: 33.33, slowCalls: 18.83 },
      { methodId: "dynajev", food: 7.17, survival: 83.33, slowCalls: 14.67 },
    ],
    refined: [
      { methodId: "jev_only", food: 0.17, survival: 0.00, slowCalls: 0.00 },
      { methodId: "prefix_completion", food: 1.00, survival: 0.00, slowCalls: 1.33 },
      { methodId: "prefix_per_step", food: 6.50, survival: 50.00, slowCalls: 26.50 },
      { methodId: "prefix_feedback", food: 6.17, survival: 66.67, slowCalls: 23.50 },
      { methodId: "handoff_completion", food: 6.33, survival: 50.00, slowCalls: 4.17 },
      { methodId: "handoff_per_step", food: 5.17, survival: 16.67, slowCalls: 19.83 },
      { methodId: "dynajev", food: 7.33, survival: 83.33, slowCalls: 15.67 },
    ],
  },
  freeway: [
    { methodId: "jev_only", success: 0.00, steps: 30.00 },
    { methodId: "prefix_completion", success: 100.00, steps: 19.67 },
    { methodId: "prefix_per_step", success: 100.00, steps: 17.50 },
    { methodId: "prefix_feedback", success: 83.33, steps: 16.67 },
    { methodId: "handoff_completion", success: 50.00, steps: 22.33 },
    { methodId: "handoff_per_step", success: 83.33, steps: 15.83 },
    { methodId: "dynajev", success: 100.00, steps: 14.00 },
  ],
  overcooked: [
    { methodId: "jev_only", orders: 0.00, reward: 0.00 },
    { methodId: "prefix_completion", orders: 0.17, reward: 6.50 },
    { methodId: "prefix_per_step", orders: 0.17, reward: 6.17 },
    { methodId: "prefix_feedback", orders: 0.33, reward: 11.33 },
    { methodId: "handoff_completion", orders: 0.33, reward: 10.33 },
    { methodId: "handoff_per_step", orders: 0.17, reward: 6.67 },
    { methodId: "dynajev", orders: 0.67, reward: 19.67 },
  ],
  pvz: {
    easy: [
      { methodId: "jev_only", kills: 8.67, reward: 1111.11 },
      { methodId: "prefix_completion", kills: 13.67, reward: 1720.00 },
      { methodId: "prefix_per_step", kills: 7.67, reward: 1000.00 },
      { methodId: "prefix_feedback", kills: 13.67, reward: 1733.33 },
      { methodId: "handoff_completion", kills: 13.67, reward: 1733.33 },
      { methodId: "handoff_per_step", kills: 14.00, reward: 1773.33 },
      { methodId: "dynajev", kills: 13.67, reward: 1733.33 },
    ],
    medium: [
      { methodId: "jev_only", kills: 9.00, reward: 1213.33 },
      { methodId: "prefix_completion", kills: 16.67, reward: 2133.33 },
      { methodId: "prefix_per_step", kills: 8.00, reward: 1120.00 },
      { methodId: "prefix_feedback", kills: 15.33, reward: 2000.00 },
      { methodId: "handoff_completion", kills: 18.00, reward: 2346.67 },
      { methodId: "handoff_per_step", kills: 17.67, reward: 2306.67 },
      { methodId: "dynajev", kills: 18.00, reward: 2346.67 },
    ],
    hard: [
      { methodId: "jev_only", kills: 5.67, reward: 928.89 },
      { methodId: "prefix_completion", kills: 6.33, reward: 973.33 },
      { methodId: "prefix_per_step", kills: 8.00, reward: 1213.33 },
      { methodId: "prefix_feedback", kills: 17.33, reward: 2293.33 },
      { methodId: "handoff_completion", kills: 20.33, reward: 2626.67 },
      { methodId: "handoff_per_step", kills: 21.67, reward: 2826.67 },
      { methodId: "dynajev", kills: 23.00, reward: 2946.67 },
    ],
  },
};

const ABLATION = Object.freeze({
  handoffOnly: { label: "Handoff Only", food: 4.83, survival: 33.33 },
  handoffPrefix: { label: "Handoff + Prefix", source: { setting: "without", methodId: "dynajev" } },
});

window.DYNAJEV_METHODS = METHODS;
window.DYNAJEV_CONFIG = DYNAJEV_CONFIG;
window.DYNAJEV_RESULTS = RESULTS;

(() => {
  "use strict";

  const state = {
    videoEnvironment: "snake",
    skill: "without",
    resultEnvironment: "freeway",
    pvzDifficulty: "easy",
  };

  const fixed = (value) => Number(value).toFixed(2);
  const percent = (value) => `${fixed(value)}%`;
  const calls = (value) => Number(value) === 0 ? "0" : fixed(value);
  const methodName = (methodId) => METHODS[methodId];
  const getRow = (rows, methodId) => rows.find((row) => row.methodId === methodId);
  const isEqual = (left, right) => Math.abs(left - right) < 0.0001;

  function pauseAllVideos() {
    document.querySelectorAll("video").forEach((video) => video.pause());
  }

  function groupForEnvironment(environmentKey) {
    return DYNAJEV_CONFIG.videoGroups.find((group) => group.environmentKey === environmentKey);
  }

  function renderVideoMetadata(videoAsset, group) {
    const items = [`${group.environment} · ${group.difficulty}`];
    if (videoAsset.seed !== null) items.push(`Seed ${videoAsset.seed}`);
    if (videoAsset.skill !== null) items.push(videoAsset.skill === "refined" ? "With refined skills" : "Without skills");
    if (videoAsset.outputTokenBudget !== null) items.push(`${videoAsset.outputTokenBudget.toLocaleString()} output tokens / step`);
    if (videoAsset.endStep !== null) items.push(`${videoAsset.endStep} actions`);
    if (videoAsset.outcome !== null) items.push(videoAsset.outcome);
    return items.map((item) => `<span>${item}</span>`).join("");
  }

  function renderVideoPanel(videoAsset, group) {
    const ours = videoAsset.methodId === "dynajev";
    const media = `<video controls muted playsinline preload="metadata" aria-label="${methodName(videoAsset.methodId)} recording for ${group.environment}-${group.difficulty}" poster="${videoAsset.poster}"><source src="${videoAsset.src}" type="video/mp4" /></video>`;
    return `<article class="video-panel" data-method-id="${videoAsset.methodId}">
      <p class="video-method"><span>${methodName(videoAsset.methodId)}</span>${ours ? '<span class="ours-badge">Ours</span>' : ""}</p>
      <div class="video-media">${media}</div>
      <div class="video-speed-controls" role="group" aria-label="Playback speed for ${methodName(videoAsset.methodId)} in ${group.environment}">
        <span>Playback speed</span>
        <div class="video-speed-buttons">${[1, 2, 4].map((rate) => `<button type="button" data-playback-rate="${rate}" aria-pressed="${rate === 1}" aria-label="${rate}x playback speed">${rate}x</button>`).join("")}</div>
      </div>
      <p class="video-meta">${renderVideoMetadata(videoAsset, group)}</p>
    </article>`;
  }

  function attachVideoSpeedControls() {
    document.querySelectorAll("#video-stage .video-panel").forEach((panel) => {
      const video = panel.querySelector("video");
      const buttons = [...panel.querySelectorAll("[data-playback-rate]")];
      video.defaultPlaybackRate = 1;
      video.playbackRate = 1;
      const updateButtons = () => buttons.forEach((button) => {
        button.setAttribute("aria-pressed", String(Number(button.dataset.playbackRate) === video.playbackRate));
      });
      buttons.forEach((button) => button.addEventListener("click", () => {
        const rate = Number(button.dataset.playbackRate);
        video.defaultPlaybackRate = rate;
        video.playbackRate = rate;
        updateButtons();
      }));
      video.addEventListener("ratechange", updateButtons);
    });
  }

  function attachVideoErrorFallbacks() {
    document.querySelectorAll("#video-stage video").forEach((video) => {
      video.addEventListener("error", () => {
        const media = video.closest(".video-media");
        if (!media) return;
        const message = document.createElement("p");
        message.className = "video-unavailable";
        message.textContent = "Video unavailable";
        media.replaceChildren(message);
      }, { once: true });
    });
  }

  function renderVideoGroup() {
    pauseAllVideos();
    const group = groupForEnvironment(state.videoEnvironment);
    const stage = document.querySelector("#video-stage");

    stage.setAttribute("role", "tabpanel");
    const activeEnvironmentTab = document.querySelector(`[data-video-environment="${state.videoEnvironment}"]`);
    stage.setAttribute("aria-labelledby", activeEnvironmentTab.id);
    stage.innerHTML = `<div class="video-group-header">
        <div><h3>${group.title}</h3><p>${group.description}</p></div>
        <span class="context-badge">${group.environment} · ${group.difficulty}</span>
      </div>
      <div class="video-panel-scroll"><div class="video-panels" data-panel-count="${group.videos.length}" style="--panel-count:${group.videos.length}">${group.videos.map((video) => renderVideoPanel(video, group)).join("")}</div></div>
      <p class="group-note">These are selected qualitative episodes, not per-seed reproductions of the aggregate results reported below. After the initial-state frame, each playback second at 1x advances one environment action; playback time is not inference time.</p>
      ${group.rightsNotice ? `<p class="publication-note"><strong>Publication check required.</strong> ${group.rightsNotice}</p>` : ""}`;

    attachVideoSpeedControls();
    attachVideoErrorFallbacks();
  }

  function updateVideoTabs() {
    document.querySelectorAll("[data-video-environment]").forEach((button) => {
      const active = button.dataset.videoEnvironment === state.videoEnvironment;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });
  }

  function selectVideoEnvironment(button) {
    state.videoEnvironment = button.dataset.videoEnvironment;
    updateVideoTabs();
    renderVideoGroup();
  }

  function tableMarkup({ caption, rows, metrics }) {
    const best = {};
    metrics.forEach((metric) => {
      if (!metric.direction) return;
      const values = rows.map((row) => row[metric.key]);
      best[metric.key] = metric.direction === "min" ? Math.min(...values) : Math.max(...values);
    });
    return `<caption>${caption}</caption>
      <thead><tr><th scope="col">Method</th>${metrics.map((metric) => `<th scope="col">${metric.label}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((row) => `<tr class="${row.methodId === "dynajev" ? "ours-row" : ""}">
        <th scope="row">${methodName(row.methodId)}${row.methodId === "dynajev" ? ' <span class="ours-badge">Ours</span>' : ""}</th>
        ${metrics.map((metric) => {
          const value = metric.format(row[metric.key]);
          const isBest = metric.direction && isEqual(row[metric.key], best[metric.key]);
          return `<td>${isBest ? `<strong>${value}</strong>` : value}</td>`;
        }).join("")}
      </tr>`).join("")}</tbody>`;
  }

  function renderSnakeResults() {
    const rows = RESULTS.snake[state.skill];
    const label = state.skill === "without" ? "Without skills" : "With refined skills";
    document.querySelector("#snake-table").innerHTML = tableMarkup({
      caption: `Snake-Hard · ${label}`,
      rows,
      metrics: [
        { key: "food", label: "Food ↑", direction: "max", format: fixed },
        { key: "survival", label: "Survival@30 ↑", direction: "max", format: percent },
        { key: "slowCalls", label: "Slow Calls", direction: null, format: calls },
      ],
    });
    const dynajev = getRow(rows, "dynajev");
    document.querySelector("#snake-summary").textContent = `${label}, DynaJev collects ${fixed(dynajev.food)} food on average and achieves ${percent(dynajev.survival)} survival at step 30.`;
    document.querySelectorAll("[data-skill-switch] [data-skill]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.skill === state.skill));
    });
  }

  const ADDITIONAL_RESULT_DEFINITIONS = {
    freeway: {
      caption: "Freeway · Easy · Without skills",
      rows: () => RESULTS.freeway,
      summary: () => {
        const row = getRow(RESULTS.freeway, "dynajev");
        return `DynaJev achieves ${Number(row.success).toFixed(0)}% crossing success in ${fixed(row.steps)} mean steps.`;
      },
      metrics: [
        { key: "success", label: "Success ↑", direction: "max", format: percent },
        { key: "steps", label: "Steps ↓", direction: "min", format: fixed },
      ],
    },
    overcooked: {
      caption: "Overcooked · Easy · Without skills",
      rows: () => RESULTS.overcooked,
      summary: () => {
        const row = getRow(RESULTS.overcooked, "dynajev");
        return `DynaJev achieves ${fixed(row.orders)} delivered orders and ${fixed(row.reward)} reward.`;
      },
      metrics: [
        { key: "orders", label: "Orders ↑", direction: "max", format: fixed },
        { key: "reward", label: "Reward ↑", direction: "max", format: fixed },
      ],
    },
    pvz: {
      caption: () => `Plants vs. Zombies · ${state.pvzDifficulty[0].toUpperCase()}${state.pvzDifficulty.slice(1)} · Without skills`,
      rows: () => RESULTS.pvz[state.pvzDifficulty],
      summary: () => "DynaJev leads on Hard, ties Handoff–Completion on Medium, and is slightly below Handoff–Per-Step on Easy.",
      metrics: [
        { key: "kills", label: "Kills ↑", direction: "max", format: fixed },
        { key: "reward", label: "Reward ↑", direction: "max", format: fixed },
      ],
    },
  };

  function renderAdditionalResults() {
    const definition = ADDITIONAL_RESULT_DEFINITIONS[state.resultEnvironment];
    const caption = typeof definition.caption === "function" ? definition.caption() : definition.caption;
    document.querySelector("#additional-table").innerHTML = tableMarkup({ caption, rows: definition.rows(), metrics: definition.metrics });
    document.querySelector("#additional-summary").textContent = definition.summary();
    document.querySelector("#pvz-difficulty-switch").hidden = state.resultEnvironment !== "pvz";
    document.querySelectorAll("[data-result-environment]").forEach((button) => {
      const active = button.dataset.resultEnvironment === state.resultEnvironment;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll("[data-pvz-difficulty]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.pvzDifficulty === state.pvzDifficulty));
    });
  }

  function renderAnalysis() {
    const rows = RESULTS.snake.without;
    const prefixCompletion = getRow(rows, "prefix_completion");
    const prefixPerStep = getRow(rows, "prefix_per_step");
    const handoffCompletion = getRow(rows, "handoff_completion");
    const handoffPerStep = getRow(rows, "handoff_per_step");
    const dynajev = getRow(rows, "dynajev");

    document.querySelector("#interface-analysis-table").innerHTML = `<caption>Snake-Hard · Without skills</caption>
      <thead><tr><th scope="col">Interface</th><th scope="col">Completion Food</th><th scope="col">Per-Step Food</th><th scope="col">Higher Food</th></tr></thead>
      <tbody>
        <tr><th scope="row">Prefix</th><td>${fixed(prefixCompletion.food)}</td><td>${fixed(prefixPerStep.food)}</td><td>Per-Step</td></tr>
        <tr><th scope="row">Handoff</th><td>${fixed(handoffCompletion.food)}</td><td>${fixed(handoffPerStep.food)}</td><td>Completion</td></tr>
      </tbody>`;

    document.querySelector("#selective-replanning-copy").textContent = `Guidance updates and planner restarts serve different purposes. Without skills, DynaJev achieves ${percent(dynajev.survival)} survival with ${fixed(dynajev.slowCalls)} slow calls, compared with ${percent(handoffPerStep.survival)} survival and ${fixed(handoffPerStep.slowCalls)} calls for Handoff–Per-Step. Handoff–Completion uses only ${fixed(handoffCompletion.slowCalls)} calls but performs worse. These comparisons support retaining useful reasoning progress while restarting selectively when conditions change. Slow Calls is also affected by early termination and measures neither token cost nor wall-clock speed.`;

    const handoffOnly = ABLATION.handoffOnly;
    const handoffPrefix = getRow(RESULTS.snake[ABLATION.handoffPrefix.source.setting], ABLATION.handoffPrefix.source.methodId);
    document.querySelector("#ablation-copy").textContent = `Removing only the actor’s direct prefix access lowers Food from ${fixed(handoffPrefix.food)} to ${fixed(handoffOnly.food)} and Survival@30 from ${percent(handoffPrefix.survival)} to ${percent(handoffOnly.survival)}. The formatter receives the prefix in both conditions. This supports the complementary value of reasoning context alongside structured guidance.`;
    document.querySelector("#ablation-table").innerHTML = `<thead><tr><th scope="col">Actor input</th><th scope="col">Food ↑</th><th scope="col">Survival@30 ↑</th></tr></thead><tbody>
      <tr><th scope="row">${handoffOnly.label}</th><td>${fixed(handoffOnly.food)}</td><td>${percent(handoffOnly.survival)}</td></tr>
      <tr class="ours-row"><th scope="row">${ABLATION.handoffPrefix.label}</th><td><strong>${fixed(handoffPrefix.food)}</strong></td><td><strong>${percent(handoffPrefix.survival)}</strong></td></tr>
    </tbody>`;
  }

  function renderResourceLinks() {
    const codeUrl = DYNAJEV_CONFIG.resources.codeUrl;
    const hasCodeUrl = typeof codeUrl === "string" && codeUrl.trim() && codeUrl.trim() !== "#";
    document.querySelectorAll("[data-resource-links]").forEach((container) => {
      container.replaceChildren();
      container.hidden = false;
      const paper = document.createElement("button");
      paper.type = "button";
      paper.className = "resource-button resource-paper";
      paper.disabled = true;
      paper.setAttribute("aria-label", "Paper: Comming soon");
      paper.innerHTML = '<svg class="resource-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></svg><span class="resource-copy"><span class="resource-label">Paper</span><span class="resource-status">Comming soon</span></span>';
      container.append(paper);
      if (hasCodeUrl) {
        const anchor = document.createElement("a");
        anchor.className = "resource-button resource-code";
        anchor.href = codeUrl.trim();
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.setAttribute("aria-label", "Code (opens in a new tab)");
        anchor.innerHTML = '<svg class="resource-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 5-7 7 7 7m8-14 7 7-7 7m-3-15-2 16"/></svg><span class="resource-label">Code</span><span class="resource-arrow" aria-hidden="true">↗</span>';
        container.append(anchor);
      }
    });
  }

  function setupRovingTabs(container, selector, activate) {
    const buttons = [...container.querySelectorAll(selector)];
    buttons.forEach((button, index) => {
      if (!button.id) button.id = `${container.getAttribute("aria-label").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-tab-${index + 1}`;
      button.addEventListener("click", () => activate(button));
    });
    container.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      const current = buttons.indexOf(document.activeElement);
      if (current < 0) return;
      event.preventDefault();
      let next = current;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % buttons.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = buttons.length - 1;
      buttons[next].focus();
      activate(buttons[next]);
    });
  }

  function initFigureDialog() {
    const dialog = document.querySelector("#figure-dialog");
    const image = document.querySelector("#dialog-image");
    const documentFrame = document.querySelector("#dialog-document");
    const title = document.querySelector("#dialog-title");
    let opener = null;

    function openFigure(button) {
      opener = button;
      title.textContent = button.dataset.figureTitle;
      if (button.dataset.figureSrc) {
        const sourceImage = button.querySelector("img");
        image.src = button.dataset.figureSrc;
        image.alt = sourceImage?.alt || button.dataset.figureTitle;
        image.hidden = false;
        documentFrame.hidden = true;
      } else {
        documentFrame.src = button.dataset.documentSrc;
        documentFrame.title = button.dataset.figureTitle;
        documentFrame.hidden = false;
        image.hidden = true;
      }
      dialog.showModal();
    }

    document.querySelectorAll("[data-figure-src], [data-document-src]").forEach((button) => button.addEventListener("click", () => openFigure(button)));
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) dialog.close();
    });
    dialog.addEventListener("close", () => {
      image.removeAttribute("src");
      image.alt = "Expanded paper figure";
      image.hidden = true;
      documentFrame.removeAttribute("src");
      documentFrame.hidden = true;
      opener?.focus();
    });
  }

  function initMobileNavigation() {
    const button = document.querySelector(".menu-button");
    const nav = document.querySelector("#site-nav");
    const close = (returnFocus = false) => {
      const wasOpen = nav.classList.contains("is-open");
      nav.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      if (returnFocus && wasOpen) button.focus();
    };
    button.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => close(false)));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(true); });
    window.addEventListener("resize", () => { if (window.innerWidth > 780) close(false); });
  }

  function initNavigationHighlight() {
    const links = [...document.querySelectorAll("#site-nav a")];
    const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
    const activate = (id) => links.forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    activate("overview");
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) activate(visible.target.id);
    }, { rootMargin: "-22% 0px -66% 0px", threshold: [0, 0.08, 0.2] });
    sections.forEach((section) => observer.observe(section));
  }

  function init() {
    document.querySelectorAll("[data-video-environment]").forEach((button) => button.setAttribute("aria-controls", "video-stage"));
    document.querySelectorAll("[data-result-environment]").forEach((button) => button.setAttribute("aria-controls", "additional-results-panel"));

    setupRovingTabs(document.querySelector(".environment-tabs"), "[data-video-environment]", selectVideoEnvironment);
    setupRovingTabs(document.querySelector(".result-tabs"), "[data-result-environment]", (button) => {
      state.resultEnvironment = button.dataset.resultEnvironment;
      renderAdditionalResults();
      document.querySelector("#additional-results-panel").setAttribute("aria-labelledby", button.id);
    });

    document.querySelectorAll("[data-skill]").forEach((button) => button.addEventListener("click", () => {
      state.skill = button.dataset.skill;
      renderSnakeResults();
    }));
    document.querySelectorAll("[data-pvz-difficulty]").forEach((button) => button.addEventListener("click", () => {
      state.pvzDifficulty = button.dataset.pvzDifficulty;
      renderAdditionalResults();
    }));

    updateVideoTabs();
    renderVideoGroup();
    renderSnakeResults();
    renderAdditionalResults();
    renderAnalysis();
    renderResourceLinks();
    initFigureDialog();
    initMobileNavigation();
    initNavigationHighlight();

    const firstResultTab = document.querySelector('[data-result-environment="freeway"]');
    document.querySelector("#additional-results-panel").setAttribute("aria-labelledby", firstResultTab.id);

    if (window.location.hash) {
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: "start", behavior: "instant" });
      }));
    }
  }

  window.DynaJevSite = { renderVideoGroup, renderSnakeResults, renderAdditionalResults };
  init();
})();
