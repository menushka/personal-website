module Menushka
  class HighlightCaptionBlock < Liquid::Block
    include Liquid::StandardFilters

    # The regular expression syntax checker. Start with the language specifier.
    # Follow that by zero or more space separated options that take one of three
    # forms: name, name=value, or name="<quoted list>"
    #
    # <quoted list> is a space-separated list of numbers
    SYNTAX = %r!^([a-zA-Z0-9.+#-]+)((\s+\w+(=([\w\.\/-]+|"([0-9]+\s)*[0-9]+"))?)*)$!

    def initialize(tag_name, text, tokens)
      super
      args = text.split(' ', 2)
      @lang = args[0].downcase
      @caption = args[1].strip![1..-2]
    end

    def render(context)
      prefix = context["highlighter_prefix"] || ""
      suffix = context["highlighter_suffix"] || ""
      code = super.to_s.gsub(%r!\A(\n|\r)+|(\n|\r)+\z!, "")

      is_safe = !!context.registers[:site].safe

      output =
        case context.registers[:site].highlighter
        when "pygments"
          render_pygments(code, is_safe)
        when "rouge"
          render_rouge(code)
        else
          render_codehighlighter(code)
        end

      rendered_output = add_code_tag(output)
      prefix + rendered_output + suffix
    end

    private

    def render_pygments(code, is_safe)
      Jekyll::External.require_with_graceful_fail("pygments")

      highlighted_code = Pygments.highlight(
        code,
        :lexer   => @lang
      )

      highlighted_code.sub('<div class="highlight"><pre>', "").sub("</pre></div>", "")
    end

    def render_rouge(code)
      Jekyll::External.require_with_graceful_fail("rouge")
      formatter = Rouge::Formatters::HTML.new(
        :wrap         => false
      )
      lexer = Rouge::Lexer.find_fancy(@lang, code) || Rouge::Lexers::PlainText
      formatter.format(lexer.lex(code))
    end

    def render_codehighlighter(code)
      h(code).strip
    end

    def add_code_tag(code)
      code_attributes = [
        "class=\"language-#{@lang.to_s.tr("+", "-")}\"",
        "data-lang=\"#{@lang}\""
      ].join(" ")

      res = "<figure class=\"highlight\" style=\"width:auto;overflow:visible;background:none;\">"
      res += "<pre><code #{code_attributes}>#{code.chomp}</code></pre>"
      res += "<figcaption>#{@caption}</figcaption>" if @caption
      res += "</figure>"
      res
    end
  end
end

Liquid::Template.register_tag("highlight2", Menushka::HighlightCaptionBlock)