module.exports = {
  disableEmoji: false,
  list: ['test', 'feat', 'fix', 'chore', 'api', 'docs', 'refactor', 'style', 'ci', 'perf', 'merge'],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
  scopes: [],
  types: {
    api: {
      description: 'api 接口对接',
      emoji: '🅰️',
      value: 'api'
    },
    merge: {
      description: '分支合并',
      emoji: '🙏',
      value: 'merge'
    },
    chore: {
      description: '构建过程或辅助工具更改',
      emoji: '🤖',
      value: 'chore'
    },
    ci: {
      description: '更改持续集成软件的配置文件和package中的scripts命令，例如scopes: Travis, Circle等',
      emoji: '🎡',
      value: 'ci'
    },
    docs: {
      description: '文档变更',
      emoji: '✏️',
      value: 'docs'
    },
    feat: {
      description: '新增一个功能',
      emoji: '🎸',
      value: 'feat'
    },
    fix: {
      description: '修复一个Bug',
      emoji: '🐛',
      value: 'fix'
    },
    perf: {
      description: '优化性能',
      emoji: '⚡️',
      value: 'perf'
    },
    refactor: {
      description: '代码重构',
      emoji: '💡',
      value: 'refactor'
    },
    style: {
      description: '代码格式（不影响功能，例如空格、分号等格式修正）',
      emoji: '💄',
      value: 'style'
    },
    test: {
      description: '测试',
      emoji: '💍',
      value: 'test'
    }
  }
}
