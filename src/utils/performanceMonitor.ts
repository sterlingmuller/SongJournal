import { InteractionManager } from 'react-native';

class PerformanceMonitor {
  private frameCount: number = 0;
  private startTime: number = 0;
  private isMonitoring: boolean = false;
  private frameHandle: number | null = null;

  startMonitoring() {
    if (this.isMonitoring) return;

    this.frameCount = 0;
    this.startTime = performance.now();
    this.isMonitoring = true;

    const trackFrames = () => {
      this.frameCount++;
      this.frameHandle = requestAnimationFrame(trackFrames);
    };

    this.frameHandle = requestAnimationFrame(trackFrames);
  }

  stopMonitoring() {
    if (!this.isMonitoring) return;

    if (this.frameHandle !== null) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }

    const endTime = performance.now();
    const duration = endTime - this.startTime;
    const fps = (this.frameCount / duration) * 1000;

    this.isMonitoring = false;

    return {
      duration: duration,
      frameCount: this.frameCount,
      fps: fps,
    };
  }
}

export default new PerformanceMonitor();
