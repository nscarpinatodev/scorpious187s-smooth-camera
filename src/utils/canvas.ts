export function getMouseWorldPosition(event: {
	x: number;
	y: number;
}): { x: number; y: number } | undefined {
	const dims = canvas!.screenDimensions;
	const pivot = canvas!.stage?.pivot;
	const scale = canvas!.stage?.scale.x ?? 1;

	const canvasEl = canvas!.app?.view as HTMLElement | undefined;

	if (!canvasEl || !pivot) {
		console.warn("Missing canvas element or pivot", { canvasEl, pivot });
		return;
	}

	const rect = canvasEl.getBoundingClientRect();
	const mouseX = event.x - rect.x;
	const mouseY = event.y - rect.y;

	// pivot is the world coordinate at the center of the screen
	const worldX = (mouseX - dims[0] / 2) / scale + pivot.x;
	const worldY = (mouseY - dims[1] / 2) / scale + pivot.y;

	return { x: worldX, y: worldY };
}
