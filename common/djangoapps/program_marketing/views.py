from django.shortcuts import render


def program_marketing(request, slug):
    """
    Return marketing page for program.
    """
    import pdb; pdb.set_trace()
    
    return render(request, template_name='program_marketing/marketing_page2.html')
