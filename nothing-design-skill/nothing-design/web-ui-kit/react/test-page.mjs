import { chromium } from 'playwright';

async function validateNothingUI() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  const warnings = [];
  const componentStatus = {
    pageLoad: false,
    nothingWidgets20: false,
    activityWidget: false,
    weatherWidget: false,
    compassWidget: false,
    timeWidget: false,
    stepsWidget: false,
    widgetCard: false,
    widgetIcon: false,
    widgetPill: false,
    dotMatrix: false,
    images: { total: 0, loaded: 0, failed: 0 }
  };

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    } else if (msg.type() === 'warning') {
      warnings.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    errors.push(`Page Error: ${err.message}`);
  });

  try {
    console.log('🔍 检查开发服务器状态...');
    const response = await page.goto('http://localhost:5179/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    if (response && response.ok()) {
      console.log('✅ 开发服务器正在运行 (http://localhost:5179/)');
      componentStatus.pageLoad = true;
    } else {
      console.log('❌ 开发服务器未响应');
      return;
    }

    await page.waitForLoadState('domcontentloaded');
    console.log('✅ DOM 内容已加载');

    const title = await page.title();
    console.log(`📄 页面标题: ${title}`);

    console.log('\n🔍 检查 "Nothing Widgets 2.0" 区域...');
    const nothingWidgets20 = await page.locator('#nothing-widgets-2').isVisible();
    if (nothingWidgets20) {
      console.log('✅ "Nothing Widgets 2.0" 区域正常显示');
      componentStatus.nothingWidgets20 = true;
    } else {
      console.log('❌ "Nothing Widgets 2.0" 区域未找到');
    }

    console.log('\n🔍 检查组件渲染...');

    const components = [
      { name: 'ActivityWidget', selector: '.activity-widget' },
      { name: 'WeatherWidget', selector: '.weather-widget' },
      { name: 'CompassWidget', selector: '.compass-widget' },
      { name: 'TimeWidget', selector: '.time-widget' },
      { name: 'StepsWidget', selector: '.steps-widget' },
      { name: 'WidgetCard', selector: '.widget-card' },
      { name: 'WidgetIcon', selector: '.widget-icon' },
      { name: 'WidgetPill', selector: '.widget-pill' },
      { name: 'DotMatrix', selector: '.dot-matrix' }
    ];

    for (const component of components) {
      try {
        const isVisible = await page.locator(component.selector).first().isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          console.log(`✅ ${component.name} 已渲染`);
          componentStatus[component.name.toLowerCase().replace('widget', 'Widget')] = true;
        } else {
          console.log(`⚠️ ${component.name} 未可见或选择器不正确`);
        }
      } catch (err) {
        console.log(`❌ ${component.name} 检查失败: ${err.message}`);
      }
    }

    console.log('\n🔍 检查图片加载...');
    const images = await page.locator('img').all();
    componentStatus.images.total = images.length;
    console.log(`📷 总图片数量: ${images.length}`);

    for (const img of images) {
      try {
        const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth);
        if (naturalWidth > 0) {
          componentStatus.images.loaded++;
        } else {
          componentStatus.images.failed++;
          const src = await img.getAttribute('src');
          console.log(`❌ 图片加载失败: ${src}`);
        }
      } catch (err) {
        componentStatus.images.failed++;
      }
    }

    console.log(`✅ 成功加载的图片: ${componentStatus.images.loaded}/${componentStatus.images.total}`);
    if (componentStatus.images.failed > 0) {
      console.log(`⚠️ 加载失败的图片: ${componentStatus.images.failed}`);
    }

    console.log('\n🔍 检查控制台错误...');
    if (errors.length === 0) {
      console.log('✅ 没有控制台错误');
    } else {
      console.log(`❌ 发现 ${errors.length} 个错误:`);
      errors.forEach((err, i) => console.log(`  ${i + 1}. ${err}`));
    }

    if (warnings.length > 0) {
      console.log(`\n⚠️ 发现 ${warnings.length} 个警告:`);
      warnings.slice(0, 5).forEach((warn, i) => console.log(`  ${i + 1}. ${warn}`));
      if (warnings.length > 5) {
        console.log(`  ... 还有 ${warnings.length - 5} 个警告`);
      }
    }

  } catch (err) {
    console.error(`❌ 测试失败: ${err.message}`);
    errors.push(err.message);
  } finally {
    await browser.close();
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 验证报告总结');
  console.log('='.repeat(60));
  console.log(`页面加载: ${componentStatus.pageLoad ? '✅' : '❌'}`);
  console.log(`Nothing Widgets 2.0 区域: ${componentStatus.nothingWidgets20 ? '✅' : '❌'}`);
  console.log(`ActivityWidget: ${componentStatus.activityWidget ? '✅' : '⚠️'}`);
  console.log(`WeatherWidget: ${componentStatus.weatherWidget ? '✅' : '⚠️'}`);
  console.log(`CompassWidget: ${componentStatus.compassWidget ? '✅' : '⚠️'}`);
  console.log(`TimeWidget: ${componentStatus.timeWidget ? '✅' : '⚠️'}`);
  console.log(`StepsWidget: ${componentStatus.stepsWidget ? '✅' : '⚠️'}`);
  console.log(`WidgetCard: ${componentStatus.widgetCard ? '✅' : '⚠️'}`);
  console.log(`WidgetIcon: ${componentStatus.widgetIcon ? '✅' : '⚠️'}`);
  console.log(`WidgetPill: ${componentStatus.widgetPill ? '✅' : '⚠️'}`);
  console.log(`DotMatrix: ${componentStatus.dotMatrix ? '✅' : '⚠️'}`);
  console.log(`图片加载: ${componentStatus.images.loaded}/${componentStatus.images.total} ✅`);
  if (componentStatus.images.failed > 0) {
    console.log(`  失败: ${componentStatus.images.failed} ⚠️`);
  }
  console.log(`\n控制台错误: ${errors.length === 0 ? '✅ 无' : `❌ ${errors.length} 个`}`);
  console.log('='.repeat(60));

  return {
    success: componentStatus.pageLoad && componentStatus.nothingWidgets20,
    errors,
    warnings,
    componentStatus
  };
}

validateNothingUI().then(result => {
  console.log('\n测试完成');
  process.exit(result.success ? 0 : 1);
}).catch(err => {
  console.error('测试执行失败:', err);
  process.exit(1);
});
